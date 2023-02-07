import { Injectable } from '@nestjs/common';
import { User } from '../domain/user';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserEntityReponseAdapter {
  adaptUser(user: UserEntity): User {
    return {
      id: user.id,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      phoneNumber: user.phoneNumber,
    };
  }
}
