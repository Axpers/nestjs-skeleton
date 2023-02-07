import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { USER_ROLES, UserRole } from '../../domain/user';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: USER_ROLES,
    default: 'regular',
  })
  role: UserRole;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phoneNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(
    id: string,
    role: UserRole,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phoneNumber: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.role = role;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
