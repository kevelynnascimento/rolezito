import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Favorite } from './favorite.entity';
import { Notification } from './notification.entity';
import { Review } from './review.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsNotEmpty({ message: 'Username é obrigatório' })
  username: string;

  @Column({ unique: true })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @Column()
  @IsNotEmpty({ message: 'Nome completo é obrigatório' })
  fullName: string;

  @Column()
  @MinLength(6, { message: 'Senha deve ter pelo menos 6 caracteres' })
  password: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  avatar?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Review, review => review.user)
  reviews: Review[];

  @OneToMany(() => Favorite, favorite => favorite.user)
  favorites: Favorite[];

  @OneToMany(() => Notification, notification => notification.user)
  notifications: Notification[];
}