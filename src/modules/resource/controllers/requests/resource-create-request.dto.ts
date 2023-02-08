import { IsNotEmpty, IsString } from 'class-validator';

export class ResourceCreateRequest {
  @IsNotEmpty()
  @IsString()
  description: string;

  constructor(description: string) {
    this.description = description;
  }
}
