import { Injectable } from '@nestjs/common';
import { User } from '../domain/user';
import { UserReponse } from './responses/user-response.dto';

@Injectable()
export class UserControllerReponseAdapter {
  adaptUser(user: User): UserReponse {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };
  }
}
