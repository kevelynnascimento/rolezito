import { IsNotEmpty, IsOptional, IsNumber, Min, Max, IsUrl } from 'class-validator';

export class CreatePlaceDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'Descrição é obrigatória' })
  description: string;

  @IsNotEmpty({ message: 'Endereço é obrigatório' })
  address: string;

  @IsNumber({}, { message: 'Latitude deve ser um número' })
  @Min(-90, { message: 'Latitude deve ser entre -90 e 90' })
  @Max(90, { message: 'Latitude deve ser entre -90 e 90' })
  latitude: number;

  @IsNumber({}, { message: 'Longitude deve ser um número' })
  @Min(-180, { message: 'Longitude deve ser entre -180 e 180' })
  @Max(180, { message: 'Longitude deve ser entre -180 e 180' })
  longitude: number;

  @IsOptional()
  phone?: string;

  @IsNotEmpty({ message: 'Categoria é obrigatória' })
  categoryId: string;
}

export class UpdatePlaceDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Latitude deve ser um número' })
  @Min(-90, { message: 'Latitude deve ser entre -90 e 90' })
  @Max(90, { message: 'Latitude deve ser entre -90 e 90' })
  latitude?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Longitude deve ser um número' })
  @Min(-180, { message: 'Longitude deve ser entre -180 e 180' })
  @Max(180, { message: 'Longitude deve ser entre -180 e 180' })
  longitude?: number;

  @IsOptional()
  phone?: string;

  @IsOptional()
  categoryId?: string;
}

export class PlaceQueryDto {
  @IsOptional()
  category?: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Latitude deve ser um número' })
  lat?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Longitude deve ser um número' })
  lng?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Raio deve ser um número' })
  @Min(1, { message: 'Raio deve ser maior que 0' })
  radius?: number = 10;
}

export class PlaceResponseDto {
  id: string;
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
  averageRating: number;
  reviewCount: number;
  distance?: number;
  category: {
    id: string;
    name: string;
    icon: string;
  };
  images: Array<{
    id: string;
    url: string;
  }>;
  reviews: Array<{
    id: string;
    rating: number;
    comment: string;
    createdAt: Date;
    user: {
      id: string;
      username: string;
      fullName: string;
    };
  }>;
}