import { Injectable } from '@nestjs/common';
import { User } from '../domain/user';
import { UserResponse } from './responses/user-response.dto';

@Injectable()
export class UserControllerResponseAdapter {
  adaptUser(user: User): UserResponse {
    return {
      id: user.id,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };
  }
}
