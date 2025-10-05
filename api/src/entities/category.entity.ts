import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Place } from './place.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  icon: string;

  @Column('json', { nullable: true })
  filters: { id: string; label: string }[];

  @OneToMany(() => Place, place => place.category)
  places: Place[];
}