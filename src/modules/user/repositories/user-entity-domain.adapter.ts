import { Injectable } from '@nestjs/common';
import { User } from '../domain/user';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserEntityToDomainAdapter {
  adaptUser(user: UserEntity): User {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      phoneNumber: user.phoneNumber,
    };
  }
}
