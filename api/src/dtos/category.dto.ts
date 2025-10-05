import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'Ícone é obrigatório' })
  icon: string;

  @IsOptional()
  filters?: Array<{ id: string; label: string }>;
}

export class UpdateCategoryDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  icon?: string;

  @IsOptional()
  filters?: Array<{ id: string; label: string }>;
}

export class CategoryResponseDto {
  id: string;
  name: string;
  icon: string;
  filters?: Array<{ id: string; label: string }>;
}