import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Username é obrigatório' })
  username: string;

  @IsEmail({}, { message: 'Email deve ser válido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @IsNotEmpty({ message: 'Nome completo é obrigatório' })
  fullName: string;

  @MinLength(6, { message: 'Senha deve ter pelo menos 6 caracteres' })
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  password: string;

  @IsOptional()
  phone?: string;
}

export class LoginDto {
  @IsNotEmpty({ message: 'Email ou username é obrigatório' })
  emailOrUsername: string;

  @IsNotEmpty({ message: 'Senha é obrigatória' })
  password: string;
}

export class AuthResponseDto {
  message: string;
  user: {
    id: string;
    username: string;
    email: string;
    fullName: string;
    phone?: string;
    avatar?: string;
  };
  token: string;
}

export class UserResponseDto {
  id: string;
  username: string;
  email: string;
  fullName: string;
  phone?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}