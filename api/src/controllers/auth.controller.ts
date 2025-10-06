import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { 
  JsonController, 
  Post, 
  Body, 
  HttpCode, 
  BadRequestError, 
  InternalServerError,
  Get,
  Authorized
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { AppDataSource } from '../config/database';
import { User } from '../entities/user.entity';
import { RegisterDto, LoginDto, AuthResponseDto, UserResponseDto } from '../dtos/auth.dto';
import { ErrorResponseDto } from '../dtos/common.dto';
import { UserRole } from '../enums/user-role.enum';

@JsonController('/auth')
@OpenAPI({ tags: ['Authentication'] })
export class AuthController {

  @Post('/register')
  @HttpCode(201)
  @OpenAPI({ 
    summary: 'Registra um novo usuário',
    description: 'Cria uma nova conta de usuário no sistema'
  })
  @ResponseSchema(AuthResponseDto, { statusCode: 201 })
  @ResponseSchema(ErrorResponseDto, { statusCode: 400 })
  async register(@Body() registerData: RegisterDto): Promise<AuthResponseDto> {
    try {
      const { email, password, role } = registerData;

      const userRepository = AppDataSource.getRepository(User);

      // Verificar se usuário já existe
      const existingUser = await userRepository.findOne({
        where: { email }
      });

      if (existingUser) {
        throw new BadRequestError('Email já está em uso');
      }

      // Criar novo usuário
      const user = new User();
      user.email = email;
      user.password = await bcrypt.hash(password, 10);
      user.role = role || UserRole.USER;

      await userRepository.save(user);

      // Gerar token
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '24h' }
      );

      return {
        message: 'Usuário criado com sucesso',
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          isActive: user.isActive
        },
        token
      };
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw error;
      }
      throw new InternalServerError('Erro interno do servidor');
    }
  }

  @Post('/login')
  @HttpCode(200)
  @OpenAPI({ 
    summary: 'Faz login do usuário',
    description: 'Autentica um usuário e retorna um token JWT'
  })
  @ResponseSchema(AuthResponseDto, { statusCode: 200 })
  @ResponseSchema(ErrorResponseDto, { statusCode: 401 })
  async login(@Body() loginData: LoginDto): Promise<AuthResponseDto> {
    try {
      const { email, password } = loginData;

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ 
        where: { email }
      });

      if (!user || !await bcrypt.compare(password, user.password)) {
        throw new BadRequestError('Credenciais inválidas');
      }

      if (!user.isActive) {
        throw new BadRequestError('Usuário desativado');
      }

      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '24h' }
      );

      return {
        message: 'Login realizado com sucesso',
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          isActive: user.isActive
        },
        token
      };
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw error;
      }
      throw new InternalServerError('Erro interno do servidor');
    }
  }
}