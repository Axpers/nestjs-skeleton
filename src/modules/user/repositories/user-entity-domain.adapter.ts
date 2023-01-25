import { Injectable } from '@nestjs/common';
import { User } from '../domain/user';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserEntityToDomainAdapter {
  adaptUser(user: UserEntity): User {
    return {
      id: user.id,
      name: user.name,
      password: user.password,
    };
  }
}
