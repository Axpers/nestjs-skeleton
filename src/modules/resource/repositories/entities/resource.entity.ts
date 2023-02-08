import { UserEntity } from 'src/modules/user/repositories/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'Resource' })
export class ResourceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.resources, { eager: false })
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(
    id: string,
    description: string,
    user: UserEntity,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.description = description;
    this.user = user;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
