import { 
  JsonController, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Param, 
  Body, 
  HttpCode, 
  UseBefore,
  Req,
  NotFoundError, 
  BadRequestError,
  InternalServerError
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { AppDataSource } from '../config/database';
import { Category } from '../entities/category.entity';
import { AuthMiddleware, AuthenticatedRequest } from '../middleware/auth.middleware';
import { 
  CreateCategoryDto, 
  UpdateCategoryDto, 
  CategoryResponseDto 
} from '../dtos/category.dto';
import { ErrorResponseDto } from '../dtos/common.dto';

@JsonController('/categories')
@OpenAPI({ tags: ['Categories'] })
export class CategoryController {
  @Get()
  @OpenAPI({ 
    summary: 'Lista todas as categorias',
    description: 'Retorna uma lista com todas as categorias disponíveis'
  })
  @ResponseSchema(CategoryResponseDto, { isArray: true })
  async getAll(): Promise<CategoryResponseDto[]> {
    try {
      const categoryRepository = AppDataSource.getRepository(Category);
      const categories = await categoryRepository.find();

      return categories.map(category => ({
        id: category.id,
        name: category.name,
        icon: category.icon,
        filters: category.filters
      }));
    } catch (error) {
      throw new InternalServerError('Erro interno do servidor');
    }
  }

  @Post()
  @HttpCode(201)
  @UseBefore(AuthMiddleware)
  @OpenAPI({ 
    summary: 'Cria uma nova categoria',
    description: 'Cria uma nova categoria no sistema (requer autenticação)',
    security: [{ bearerAuth: [] }]
  })
  @ResponseSchema(CategoryResponseDto, { statusCode: 201 })
  @ResponseSchema(ErrorResponseDto, { statusCode: 400 })
  @ResponseSchema(ErrorResponseDto, { statusCode: 401 })
  async create(
    @Body() categoryData: CreateCategoryDto,
    @Req() request: AuthenticatedRequest
  ): Promise<CategoryResponseDto> {
    try {
      const categoryRepository = AppDataSource.getRepository(Category);
      
      // Verificar se categoria já existe
      const existingCategory = await categoryRepository.findOne({ where: { name: categoryData.name } });
      if (existingCategory) {
        throw new BadRequestError('Categoria já existe');
      }

      const category = categoryRepository.create(categoryData);
      await categoryRepository.save(category);

      return {
        id: category.id,
        name: category.name,
        icon: category.icon,
        filters: category.filters
      };
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw error;
      }
      throw new InternalServerError('Erro interno do servidor');
    }
  }
}