import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UserRegisterDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsDefined()
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
