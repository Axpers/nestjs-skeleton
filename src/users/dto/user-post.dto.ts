import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class UserPostDTO {
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;
}
