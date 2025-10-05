import { 
  JsonController, 
  Get, 
  Patch, 
  Param, 
  UseBefore,
  Req,
  NotFoundError, 
  InternalServerError
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Notification } from '../entities/notification.entity';
import { AppDataSource } from '../config/database';
import { AuthMiddleware, AuthenticatedRequest } from '../middleware/auth.middleware';
import { NotificationResponseDto, MarkAsReadResponseDto } from '../dtos/notification.dto';
import { ErrorResponseDto } from '../dtos/common.dto';

@JsonController('/notifications')
@OpenAPI({ tags: ['Notifications'] })
export class NotificationController {
  @Get()
  @UseBefore(AuthMiddleware)
  @OpenAPI({ 
    summary: 'Lista notificações do usuário',
    description: 'Retorna todas as notificações do usuário autenticado',
    security: [{ bearerAuth: [] }]
  })
  @ResponseSchema(NotificationResponseDto, { isArray: true })
  @ResponseSchema(ErrorResponseDto, { statusCode: 401 })
  async getAll(@Req() request: AuthenticatedRequest): Promise<NotificationResponseDto[]> {
    try {
      const userId = request.user!.id;
      const notificationRepository = AppDataSource.getRepository(Notification);

      const notifications = await notificationRepository.find({
        where: { userId },
        order: { createdAt: 'DESC' }
      });

      return notifications;
    } catch (error) {
      throw new InternalServerError('Erro interno do servidor');
    }
  }

  @Patch('/:id/read')
  @UseBefore(AuthMiddleware)
  @OpenAPI({ 
    summary: 'Marca notificação como lida',
    description: 'Marca uma notificação específica como lida',
    security: [{ bearerAuth: [] }]
  })
  @ResponseSchema(MarkAsReadResponseDto)
  @ResponseSchema(ErrorResponseDto, { statusCode: 404 })
  @ResponseSchema(ErrorResponseDto, { statusCode: 401 })
  async markAsRead(
    @Param('id') id: string,
    @Req() request: AuthenticatedRequest
  ): Promise<MarkAsReadResponseDto> {
    try {
      const userId = request.user!.id;
      const notificationRepository = AppDataSource.getRepository(Notification);

      const result = await notificationRepository.update(
        { id, userId },
        { read: true }
      );

      if (result.affected === 0) {
        throw new NotFoundError('Notificação não encontrada');
      }

      return { message: 'Notificação marcada como lida' };
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InternalServerError('Erro interno do servidor');
    }
  }
}