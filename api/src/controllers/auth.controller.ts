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
      const { username, email, password, fullName, phone } = registerData;

      const userRepository = AppDataSource.getRepository(User);

      // Verificar se usuário já existe
      const existingUser = await userRepository.findOne({
        where: [{ email }, { username }]
      });

      if (existingUser) {
        throw new BadRequestError('Usuário já existe');
      }

      // Criar novo usuário
      const user = new User();
      user.username = username;
      user.email = email;
      user.fullName = fullName;
      user.phone = phone;
      user.password = await bcrypt.hash(password, 10);

      await userRepository.save(user);

      // Gerar token
      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '24h' }
      );

      return {
        message: 'Usuário criado com sucesso',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          phone: user.phone
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
      const { emailOrUsername, password } = loginData;

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ 
        where: [
          { email: emailOrUsername },
          { username: emailOrUsername }
        ]
      });

      if (!user || !await bcrypt.compare(password, user.password)) {
        throw new BadRequestError('Credenciais inválidas');
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '24h' }
      );

      return {
        message: 'Login realizado com sucesso',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          phone: user.phone,
          avatar: user.avatar
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