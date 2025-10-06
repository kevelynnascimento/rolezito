import { IsEmail, IsNotEmpty, IsOptional, MinLength, IsEnum, IsBoolean } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

export class RegisterDto {
  @IsEmail({}, { message: 'Email deve ser válido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @MinLength(6, { message: 'Senha deve ter pelo menos 6 caracteres' })
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  password: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'Role deve ser válido' })
  role?: UserRole;
}

export class LoginDto {
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Email deve ser válido' })
  email: string;

  @IsNotEmpty({ message: 'Senha é obrigatória' })
  password: string;
}

export class AuthResponseDto {
  message: string;
  user: {
    id: string;
    email: string;
    role: UserRole;
    isActive: boolean;
  };
  token: string;
}

export class UserResponseDto {
  id: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class UpdateUserStatusDto {
  @IsBoolean({ message: 'isActive deve ser um valor booleano' })
  isActive: boolean;
}

export class UpdateUserRoleDto {
  @IsEnum(UserRole, { message: 'Role deve ser válido' })
  role: UserRole;
}