import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  JsonController,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Authorized,
  CurrentUser,
  QueryParam,
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  HttpCode,
  InternalServerError
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { AppDataSource } from '../config/database';
import { User } from '../entities/user.entity';
import { UserRole } from '../enums/user-role.enum';
import { 
  UserResponseDto, 
  RegisterDto, 
  LoginDto, 
  AuthResponseDto,
  UpdateUserStatusDto,
  UpdateUserRoleDto
} from '../dtos/user.dto';
import { ErrorResponseDto } from '../dtos/common.dto';

@JsonController('/users')
@OpenAPI({ tags: ['User Management'] })
export class UserController {

  @Post('/register')
  @HttpCode(201)
  @OpenAPI({ 
    summary: 'Registra um novo usuário',
    description: 'Cria uma nova conta de usuário no sistema',
    tags: ['Authentication']
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
    description: 'Autentica um usuário e retorna um token JWT',
    tags: ['Authentication']
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

  @Get()
  @Authorized()
  @OpenAPI({ 
    summary: 'Lista todos os usuários (Admin apenas)',
    description: 'Retorna uma lista de todos os usuários do sistema'
  })
  @ResponseSchema(UserResponseDto, { isArray: true })
  @ResponseSchema(ErrorResponseDto, { statusCode: 403 })
  async getUsers(
    @CurrentUser() currentUser: User,
    @QueryParam('role') role?: UserRole,
    @QueryParam('isActive') isActive?: boolean
  ): Promise<UserResponseDto[]> {
    if (currentUser.role !== UserRole.ADMIN) {
      throw new ForbiddenError('Acesso negado');
    }

    const userRepository = AppDataSource.getRepository(User);
    
    const where: any = {};
    if (role) where.role = role;
    if (isActive !== undefined) where.isActive = isActive;

    const users = await userRepository.find({ where });

    return users.map(user => ({
      id: user.id,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }));
  }

  @Get('/:id')
  @Authorized()
  @OpenAPI({ 
    summary: 'Busca usuário por ID',
    description: 'Retorna informações de um usuário específico'
  })
  @ResponseSchema(UserResponseDto)
  @ResponseSchema(ErrorResponseDto, { statusCode: 404 })
  async getUserById(
    @Param('id') id: string,
    @CurrentUser() currentUser: User
  ): Promise<UserResponseDto> {
    // Usuários podem ver apenas suas próprias informações, exceto admins
    if (currentUser.role !== UserRole.ADMIN && currentUser.id !== id) {
      throw new ForbiddenError('Acesso negado');
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  @Put('/:id/role')
  @Authorized()
  @OpenAPI({ 
    summary: 'Atualiza role do usuário (Admin apenas)',
    description: 'Permite que admins alterem o role de outros usuários'
  })
  @ResponseSchema(UserResponseDto)
  @ResponseSchema(ErrorResponseDto, { statusCode: 403 })
  async updateUserRole(
    @Param('id') id: string,
    @Body() body: UpdateUserRoleDto,
    @CurrentUser() currentUser: User
  ): Promise<UserResponseDto> {
    if (currentUser.role !== UserRole.ADMIN) {
      throw new ForbiddenError('Acesso negado');
    }

    if (currentUser.id === id) {
      throw new BadRequestError('Você não pode alterar seu próprio role');
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    user.role = body.role;
    await userRepository.save(user);

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  @Put('/:id/status')
  @Authorized()
  @OpenAPI({ 
    summary: 'Ativa/desativa usuário (Admin apenas)',
    description: 'Permite que admins ativem ou desativem usuários'
  })
  @ResponseSchema(UserResponseDto)
  @ResponseSchema(ErrorResponseDto, { statusCode: 403 })
  async updateUserStatus(
    @Param('id') id: string,
    @Body() body: UpdateUserStatusDto,
    @CurrentUser() currentUser: User
  ): Promise<UserResponseDto> {
    if (currentUser.role !== UserRole.ADMIN) {
      throw new ForbiddenError('Acesso negado');
    }

    if (currentUser.id === id) {
      throw new BadRequestError('Você não pode alterar seu próprio status');
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    user.isActive = body.isActive;
    await userRepository.save(user);

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  @Delete('/:id')
  @Authorized()
  @OpenAPI({ 
    summary: 'Remove usuário (Admin apenas)',
    description: 'Remove permanentemente um usuário do sistema'
  })
  @ResponseSchema(ErrorResponseDto, { statusCode: 403 })
  async deleteUser(
    @Param('id') id: string,
    @CurrentUser() currentUser: User
  ): Promise<{ message: string }> {
    if (currentUser.role !== UserRole.ADMIN) {
      throw new ForbiddenError('Acesso negado');
    }

    if (currentUser.id === id) {
      throw new BadRequestError('Você não pode deletar sua própria conta');
    }

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    await userRepository.remove(user);

    return { message: 'Usuário removido com sucesso' };
  }
}