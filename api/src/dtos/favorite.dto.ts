import { IsNotEmpty, IsString } from 'class-validator';

export class AddFavoriteDto {
  @IsNotEmpty()
  @IsString()
  placeId: string;
}

export class FavoriteResponseDto {
  id: string;
  userId: string;
  placeId: string;
  createdAt: Date;
  place?: any; // Include place details when needed
}