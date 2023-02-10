import { Injectable } from '@nestjs/common';
import { ResourceEntityAdapter } from 'src/modules/resource/repositories/entities/resource-entity.adapter';
import { User } from '../../domain/user';
import { UserEntity } from './user.entity';

@Injectable()
export class UserEntityAdapter {
  constructor(private readonly resourceEntityAdapter: ResourceEntityAdapter) {}

  adaptUser(user: UserEntity): User {
    const resources = user.resources.map((resourceEntity) =>
      this.resourceEntityAdapter.adaptResource(resourceEntity),
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
