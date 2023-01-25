import { Injectable } from '@nestjs/common';
import { User } from '../domain/user';
import { UserReponse } from './responses/user-response.dto';

@Injectable()
export class UserDomainToControllerAdapter {
  adaptUser(user: User): UserReponse {
    return {
      id: user.id,
      name: user.name,
    };
  }
}
