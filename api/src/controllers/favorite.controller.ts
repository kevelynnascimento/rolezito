import { 
  JsonController, 
  Get, 
  Post, 
  Delete, 
  Param, 
  HttpCode, 
  UseBefore,
  Req,
  NotFoundError, 
  BadRequestError,
  InternalServerError
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { AppDataSource } from '../config/database';
import { Favorite } from '../entities/favorite.entity';
import { AuthMiddleware, AuthenticatedRequest } from '../middleware/auth.middleware';
import { FavoriteResponseDto } from '../dtos/favorite.dto';
import { ErrorResponseDto } from '../dtos/common.dto';

@JsonController('/favorites')
@OpenAPI({ tags: ['Favorites'] })
export class FavoriteController {
  @Get()
  @UseBefore(AuthMiddleware)
  @OpenAPI({ 
    summary: 'Lista lugares favoritos do usuário',
    description: 'Retorna uma lista com todos os lugares favoritos do usuário autenticado',
    security: [{ bearerAuth: [] }]
  })
  @ResponseSchema(FavoriteResponseDto, { isArray: true })
  @ResponseSchema(ErrorResponseDto, { statusCode: 401 })
  async getAll(@Req() request: AuthenticatedRequest): Promise<any[]> {
    try {
      const userId = request.user!.id;
      const favoriteRepository = AppDataSource.getRepository(Favorite);

      const favorites = await favoriteRepository.find({
        where: { userId },
        relations: ['place', 'place.category', 'place.images'],
        order: { createdAt: 'DESC' }
      });

      return favorites.map(fav => fav.place);
    } catch (error) {
      throw new InternalServerError('Erro interno do servidor');
    }
  }

  @Post('/:placeId')
  @HttpCode(201)
  @UseBefore(AuthMiddleware)
  @OpenAPI({ 
    summary: 'Adiciona lugar aos favoritos',
    description: 'Adiciona um lugar específico aos favoritos do usuário autenticado',
    security: [{ bearerAuth: [] }]
  })
  @ResponseSchema(Object, { statusCode: 201 })
  @ResponseSchema(ErrorResponseDto, { statusCode: 400 })
  @ResponseSchema(ErrorResponseDto, { statusCode: 401 })
  async add(
    @Param('placeId') placeId: string,
    @Req() request: AuthenticatedRequest
  ): Promise<{ message: string }> {
    try {
      const userId = request.user!.id;
      const favoriteRepository = AppDataSource.getRepository(Favorite);

      // Verificar se já está nos favoritos
      const existing = await favoriteRepository.findOne({
        where: { userId, placeId }
      });

      if (existing) {
        throw new BadRequestError('Lugar já está nos favoritos');
      }

      const favorite = favoriteRepository.create({ userId, placeId });
      await favoriteRepository.save(favorite);

      return { message: 'Lugar adicionado aos favoritos' };
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw error;
      }
      throw new InternalServerError('Erro interno do servidor');
    }
  }

  @Delete('/:placeId')
  @UseBefore(AuthMiddleware)
  @OpenAPI({ 
    summary: 'Remove lugar dos favoritos',
    description: 'Remove um lugar específico dos favoritos do usuário autenticado',
    security: [{ bearerAuth: [] }]
  })
  @ResponseSchema(Object)
  @ResponseSchema(ErrorResponseDto, { statusCode: 404 })
  @ResponseSchema(ErrorResponseDto, { statusCode: 401 })
  async remove(
    @Param('placeId') placeId: string,
    @Req() request: AuthenticatedRequest
  ): Promise<{ message: string }> {
    try {
      const userId = request.user!.id;
      const favoriteRepository = AppDataSource.getRepository(Favorite);

      const result = await favoriteRepository.delete({ userId, placeId });

      if (result.affected === 0) {
        throw new NotFoundError('Favorito não encontrado');
      }

      return { message: 'Lugar removido dos favoritos' };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InternalServerError('Erro interno do servidor');
    }
  }
}