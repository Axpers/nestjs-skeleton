import { Injectable } from '@nestjs/common';
import { ResourceControllerResponseAdapter } from 'src/modules/resource/controllers/resource-controller-response.adapter';
import { User } from '../domain/user';
import { UserResponse } from './responses/user-response.dto';

@Injectable()
export class UserControllerResponseAdapter {
  constructor(
    private readonly resourceControllerResponseAdapter: ResourceControllerResponseAdapter,
  ) {}

  adaptUser(user: User): UserResponse {
    const resources = user.resources.map((resource) =>
      this.resourceControllerResponseAdapter.adaptResourceForUserResponse(
        resource,
      ),
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
