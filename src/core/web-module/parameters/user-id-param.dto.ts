import { IsUUID } from 'class-validator';

export class UserIdParamDto {
  @IsUUID()
  userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }
}
