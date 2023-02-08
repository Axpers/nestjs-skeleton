import { Injectable } from '@nestjs/common';
import { ResourceEntityResponseAdapter } from 'src/modules/resource/repositories/resource-repository-response.adapter';
import { User } from '../domain/user';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserEntityResponseAdapter {
  constructor(
    private readonly resourceEntityResponseAdapter: ResourceEntityResponseAdapter,
  ) {}

  adaptUser(user: UserEntity): User {
    const resources = user.resources.map((resourceEntity) =>
      this.resourceEntityResponseAdapter.adaptResource(resourceEntity),
    );

    return {
      id: user.id,
      role: user.role,
      resources,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      phoneNumber: user.phoneNumber,
    };
  }
}
