import { 
  JsonController, 
  Get, 
  Post, 
  Param, 
  Body, 
  HttpCode, 
  UseBefore,
  Req,
  QueryParam,
  NotFoundError, 
  BadRequestError,
  InternalServerError
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { AppDataSource } from '../config/database';
import { Place } from '../entities/place.entity';
import { Review } from '../entities/review.entity';
import { AuthMiddleware, AuthenticatedRequest } from '../middleware/auth.middleware';
import { CreateReviewDto, ReviewResponseDto } from '../dtos/review.dto';
import { ErrorResponseDto } from '../dtos/common.dto';

@JsonController('/places')
@OpenAPI({ tags: ['Reviews'] })
export class ReviewController {
  @Post('/:placeId/reviews')
  @HttpCode(201)
  @UseBefore(AuthMiddleware)
  @OpenAPI({ 
    summary: 'Cria uma nova avaliação',
    description: 'Cria uma nova avaliação para um lugar específico',
    security: [{ bearerAuth: [] }]
  })
  @ResponseSchema(ReviewResponseDto, { statusCode: 201 })
  @ResponseSchema(ErrorResponseDto, { statusCode: 400 })
  @ResponseSchema(ErrorResponseDto, { statusCode: 404 })
  @ResponseSchema(ErrorResponseDto, { statusCode: 401 })
  async create(
    @Param('placeId') placeId: string,
    @Body() reviewData: CreateReviewDto,
    @Req() request: AuthenticatedRequest
  ): Promise<ReviewResponseDto> {
    try {
      const { rating, comment } = reviewData;
      const userId = request.user!.id;

      const reviewRepository = AppDataSource.getRepository(Review);
      const placeRepository = AppDataSource.getRepository(Place);

      // Verificar se o lugar existe
      const place = await placeRepository.findOne({ where: { id: placeId } });
      if (!place) {
        throw new NotFoundError('Lugar não encontrado');
      }

      // Verificar se usuário já avaliou este lugar
      const existingReview = await reviewRepository.findOne({
        where: { userId, placeId }
      });

      if (existingReview) {
        throw new BadRequestError('Você já avaliou este lugar');
      }

      const review = reviewRepository.create({
        rating,
        comment,
        userId,
        placeId
      });

      await reviewRepository.save(review);

      // Atualizar média de avaliações do lugar
      await ReviewController.updatePlaceRating(placeId);

      const savedReview = await reviewRepository.findOne({
        where: { id: review.id },
        relations: ['user']
      });

      return savedReview!;
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof BadRequestError) {
        throw error;
      }
      throw new InternalServerError('Erro interno do servidor');
    }
  }

  @Get('/:placeId/reviews')
  @OpenAPI({ 
    summary: 'Lista avaliações de um lugar',
    description: 'Retorna todas as avaliações de um lugar específico com filtro opcional por rating'
  })
  @ResponseSchema(ReviewResponseDto, { isArray: true })
  @ResponseSchema(ErrorResponseDto, { statusCode: 500 })
  async getByPlace(
    @Param('placeId') placeId: string,
    @QueryParam('rating') rating?: number
  ): Promise<ReviewResponseDto[]> {
    try {
      const reviewRepository = AppDataSource.getRepository(Review);

      let query = reviewRepository.createQueryBuilder('review')
        .leftJoinAndSelect('review.user', 'user')
        .where('review.placeId = :placeId', { placeId })
        .orderBy('review.createdAt', 'DESC');

      if (rating) {
        query = query.andWhere('review.rating = :rating', { rating });
      }

      const reviews = await query.getMany();

      return reviews;
    } catch (error) {
      throw new InternalServerError('Erro interno do servidor');
    }
  }

  private static async updatePlaceRating(placeId: string): Promise<void> {
    const reviewRepository = AppDataSource.getRepository(Review);
    const placeRepository = AppDataSource.getRepository(Place);

    const result = await reviewRepository
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'avg')
      .addSelect('COUNT(review.id)', 'count')
      .where('review.placeId = :placeId', { placeId })
      .getRawOne();

    await placeRepository.update(placeId, {
      averageRating: parseFloat(result.avg) || 0,
      reviewCount: parseInt(result.count) || 0
    });
  }
}