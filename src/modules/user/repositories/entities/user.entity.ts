import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phoneNumber: string,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
  }
}
