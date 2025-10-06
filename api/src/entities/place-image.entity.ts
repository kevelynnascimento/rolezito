import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Place } from './place.entity';

@Entity('place_image')
export class PlaceImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column({ default: 0 })
  order: number;

  @Column()
  placeId: string;

  @ManyToOne(() => Place, place => place.images)
  @JoinColumn({ name: 'placeId' })
  place: Place;
}