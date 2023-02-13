import { IsNotEmpty, IsString } from 'class-validator';

export class ResourceUpdateRequest {
  @IsNotEmpty()
  @IsString()
  description: string;

  constructor(description: string) {
    this.description = description;
  }
}
