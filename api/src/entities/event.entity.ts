import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Place } from './place.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  date: Date;

  @Column({ nullable: true })
  price: string;

  @Column({ default: 'event' })
  type: string;

  @Column()
  placeId: string;

  @ManyToOne(() => Place, place => place.events)
  @JoinColumn({ name: 'placeId' })
  place: Place;

  @CreateDateColumn()
  createdAt: Date;
}