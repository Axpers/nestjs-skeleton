import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDto {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
