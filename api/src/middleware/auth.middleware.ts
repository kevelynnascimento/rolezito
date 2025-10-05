import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ExpressMiddlewareInterface, Middleware, UnauthorizedError } from 'routing-controllers';
import { AppDataSource } from '../config/database';
import { User } from '../entities/user.entity';

export interface AuthenticatedRequest extends Request {
  user?: User;
}

@Middleware({ type: 'before' })
export class AuthMiddleware implements ExpressMiddlewareInterface {
  async use(request: AuthenticatedRequest, response: Response, next: NextFunction): Promise<void> {
    try {
      const authHeader = request.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedError('Token não fornecido');
      }

      const token = authHeader.substring(7);
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { userId: string };
      
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { id: decoded.userId } });
      
      if (!user) {
        throw new UnauthorizedError('Usuário não encontrado');
      }

      request.user = user;
      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedError('Token inválido');
      }
      if (error instanceof UnauthorizedError) {
        throw error;
      }
      throw new UnauthorizedError('Erro de autenticação');
    }
  }
}

// Legacy middleware for compatibility (can be removed later)
export const authenticateToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token de acesso requerido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { userId: string };
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: decoded.userId } });

    if (!user) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido' });
  }
};