import { Injectable } from '@nestjs/common';
import { ResourceResponseAdapter } from 'src/modules/resource/controllers/resource-response.adapter';
import { User } from '../domain/user';
import { UserResponse } from './responses/user-response.dto';

@Injectable()
export class UserResponseAdapter {
  constructor(
    private readonly resourceResponseAdapter: ResourceResponseAdapter,
  ) {}

  adaptUser(user: User): UserResponse {
    const resources = user.resources.map((resource) =>
      this.resourceResponseAdapter.adaptResourceForUserResponse(resource),
    );

    return {
      id: user.id,
      role: user.role,
      resources,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };
  }
}
