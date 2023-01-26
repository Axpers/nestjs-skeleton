import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;

  constructor(name: string, password: string) {
    this.name = name;
    this.password = password;
  }
}
