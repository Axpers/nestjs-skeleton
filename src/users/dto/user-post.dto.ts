import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserPostDTO {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;
}
