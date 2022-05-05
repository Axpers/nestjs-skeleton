import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

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
