import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { UserRole, USER_ROLES } from '../../domain/user';

export class UserUpdateRequest {
  @IsOptional()
  @IsIn(USER_ROLES)
  role?: UserRole;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phoneNumber: string,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
  }
}
