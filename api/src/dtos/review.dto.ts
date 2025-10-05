import { IsNotEmpty, IsString, IsInt, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  @IsString()
  comment: string;
}

export class ReviewResponseDto {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  placeId: string;
  createdAt: Date;
  user?: any;
}