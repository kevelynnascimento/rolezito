import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { IsNotEmpty, IsLatitude, IsLongitude } from 'class-validator';
import { Category } from './category.entity';
import { Favorite } from './favorite.entity';
import { PlaceImage } from './place-image.entity';
import { Review } from './review.entity';
import { Event } from './event.entity';

@Entity('place')
export class Place {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @Column('text')
  description: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  phone: string;

  @Column('decimal', { precision: 10, scale: 8 })
  @IsLatitude({ message: 'Latitude inválida' })
  latitude: number;

  @Column('decimal', { precision: 11, scale: 8 })
  @IsLongitude({ message: 'Longitude inválida' })
  longitude: number;

  @Column('json', { nullable: true })
  openingHours: {
    today: string;
    week: string[];
  };

  @Column({ default: true })
  isOpen: boolean;

  @Column('json', { nullable: true })
  styleChips: { label: string }[];

  @Column('json', { nullable: true })
  highlights: string[];

  @Column('decimal', { precision: 3, scale: 2, default: 0 })
  averageRating: number;

  @Column({ default: 0 })
  reviewCount: number;

  @Column({ default: false })
  isFeatured: boolean;

  @Column()
  categoryId: string;

  @ManyToOne(() => Category, category => category.places)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @OneToMany(() => Review, review => review.place)
  reviews: Review[];

  @OneToMany(() => PlaceImage, image => image.place)
  images: PlaceImage[];

  @OneToMany(() => Favorite, favorite => favorite.place)
  favorites: Favorite[];

  @OneToMany(() => Event, event => event.place)
  events: Event[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}