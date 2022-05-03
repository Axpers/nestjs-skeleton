import { IsNotEmpty } from 'class-validator';
export class UserPostDTO {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;
}
