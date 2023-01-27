import { IsUUID } from 'class-validator';

export class UserIdParam {
  @IsUUID()
  userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }
}
