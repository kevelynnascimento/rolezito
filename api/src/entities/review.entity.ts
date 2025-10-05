import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { IsNotEmpty, Min, Max } from 'class-validator';
import { User } from './user.entity';
import { Place } from './place.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  @Min(1, { message: 'Rating deve ser pelo menos 1' })
  @Max(5, { message: 'Rating deve ser no máximo 5' })
  rating: number;

  @Column('text')
  @IsNotEmpty({ message: 'Comentário é obrigatório' })
  comment: string;

  @Column()
  userId: string;

  @Column()
  placeId: string;

  @ManyToOne(() => User, user => user.reviews)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Place, place => place.reviews)
  @JoinColumn({ name: 'placeId' })
  place: Place;

  @CreateDateColumn()
  createdAt: Date;
}