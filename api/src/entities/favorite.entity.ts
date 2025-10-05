import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, Column, Unique } from 'typeorm';
import { User } from './user.entity';
import { Place } from './place.entity';

@Entity('favorites')
@Unique(['userId', 'placeId'])
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  placeId: string;

  @ManyToOne(() => User, user => user.favorites)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Place, place => place.favorites)
  @JoinColumn({ name: 'placeId' })
  place: Place;

  @CreateDateColumn()
  createdAt: Date;
}