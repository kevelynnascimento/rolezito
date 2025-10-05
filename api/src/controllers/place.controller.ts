import { 
  JsonController, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Param, 
  Body, 
  QueryParam,
  HttpCode, 
  UseBefore,
  Req,
  NotFoundError, 
  BadRequestError,
  InternalServerError
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { AppDataSource } from '../config/database';
import { Place } from '../entities/place.entity';
import { Category } from '../entities/category.entity';
import { AuthMiddleware, AuthenticatedRequest } from '../middleware/auth.middleware';
import { 
  CreatePlaceDto, 
  UpdatePlaceDto, 
  PlaceQueryDto, 
  PlaceResponseDto 
} from '../dtos/place.dto';
import { ErrorResponseDto } from '../dtos/common.dto';

@JsonController('/places')
@OpenAPI({ tags: ['Places'] })
export class PlaceController {
  @Get()
  @OpenAPI({ 
    summary: 'Lista todos os lugares',
    description: 'Retorna uma lista de lugares'
  })
  @ResponseSchema(PlaceResponseDto, { isArray: true })
  async getAll(): Promise<PlaceResponseDto[]> {
    try {
      const placeRepository = AppDataSource.getRepository(Place);

      const places = await placeRepository.find({
        relations: ['category', 'images', 'reviews', 'reviews.user']
      });

      // Mapear para DTO
      const placesResponse: PlaceResponseDto[] = places.map(place => {

        return {
          id: place.id,
          name: place.name,
          description: place.description,
          address: place.address,
          latitude: place.latitude,
          longitude: place.longitude,
          phone: place.phone,
          averageRating: place.averageRating || 0,
          reviewCount: place.reviewCount || 0,
          category: {
            id: place.category.id,
            name: place.category.name,
            icon: place.category.icon
          },
          images: place.images?.map(img => ({
            id: img.id,
            url: img.url
          })) || [],
          reviews: place.reviews?.map(review => ({
            id: review.id,
            rating: review.rating,
            comment: review.comment,
            createdAt: review.createdAt,
            user: {
              id: review.user.id,
              username: review.user.username,
              fullName: review.user.fullName
            }
          })) || []
        };
      });

      return placesResponse;
    } catch (error) {
      throw new InternalServerError('Erro interno do servidor');
    }
  }

  @Get('/:id')
  @OpenAPI({ 
    summary: 'Busca um lugar por ID',
    description: 'Retorna os detalhes de um lugar específico'
  })
  @ResponseSchema(PlaceResponseDto)
  @ResponseSchema(ErrorResponseDto, { statusCode: 404 })
  async getById(@Param('id') id: string): Promise<PlaceResponseDto> {
    try {
      const placeRepository = AppDataSource.getRepository(Place);

      const place = await placeRepository.findOne({
        where: { id },
        relations: ['category', 'images', 'reviews', 'reviews.user', 'events']
      });

      if (!place) {
        throw new NotFoundError('Lugar não encontrado');
      }

      return {
        id: place.id,
        name: place.name,
        description: place.description,
        address: place.address,
        latitude: place.latitude,
        longitude: place.longitude,
        phone: place.phone,
        averageRating: place.averageRating || 0,
        reviewCount: place.reviewCount || 0,
        category: {
          id: place.category.id,
          name: place.category.name,
          icon: place.category.icon
        },
        images: place.images?.map(img => ({
          id: img.id,
          url: img.url
        })) || [],
        reviews: place.reviews?.map(review => ({
          id: review.id,
          rating: review.rating,
          comment: review.comment,
          createdAt: review.createdAt,
          user: {
            id: review.user.id,
            username: review.user.username,
            fullName: review.user.fullName
          }
        })) || []
      };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InternalServerError('Erro interno do servidor');
    }
  }

  @Post()
  @HttpCode(201)
  @UseBefore(AuthMiddleware)
  @OpenAPI({ 
    summary: 'Cria um novo lugar',
    description: 'Cria um novo lugar no sistema (requer autenticação)',
    security: [{ bearerAuth: [] }]
  })
  @ResponseSchema(PlaceResponseDto, { statusCode: 201 })
  @ResponseSchema(ErrorResponseDto, { statusCode: 400 })
  @ResponseSchema(ErrorResponseDto, { statusCode: 401 })
  async create(
    @Body() placeData: CreatePlaceDto,
    @Req() request: AuthenticatedRequest
  ): Promise<PlaceResponseDto> {
    try {
      const placeRepository = AppDataSource.getRepository(Place);
      const categoryRepository = AppDataSource.getRepository(Category);

      // Verificar se a categoria existe
      const category = await categoryRepository.findOne({ where: { id: placeData.categoryId } });
      if (!category) {
        throw new BadRequestError('Categoria não encontrada');
      }

      const place = placeRepository.create(placeData);
      await placeRepository.save(place);

      // Buscar o lugar criado com as relações
      const createdPlace = await placeRepository.findOne({
        where: { id: place.id },
        relations: ['category', 'images', 'reviews']
      });

      if (!createdPlace) {
        throw new InternalServerError('Erro ao criar lugar');
      }

      return {
        id: createdPlace.id,
        name: createdPlace.name,
        description: createdPlace.description,
        address: createdPlace.address,
        latitude: createdPlace.latitude,
        longitude: createdPlace.longitude,
        phone: createdPlace.phone,
        averageRating: createdPlace.averageRating || 0,
        reviewCount: createdPlace.reviewCount || 0,
        category: {
          id: createdPlace.category.id,
          name: createdPlace.category.name,
          icon: createdPlace.category.icon
        },
        images: [],
        reviews: []
      };
    } catch (error) {
      if (error instanceof BadRequestError || error instanceof InternalServerError) {
        throw error;
      }
      throw new InternalServerError('Erro interno do servidor');
    }
  }

  private static calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
}