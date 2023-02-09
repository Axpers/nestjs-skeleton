import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateRequest } from 'src/modules/auth/controllers/requests/user-create-request.dto';
import { UserUpdateRequest } from '../controllers/requests/user-update-request.dto';
import { Repository } from 'typeorm';
import { User } from '../domain/user';
import { UserRepository } from '../domain/user-repository';
import { UserEntity } from './entities/user.entity';
import { UserEntityResponseAdapter } from './user-repository-response.adapter';

@Injectable()
export class UserApiRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userEntityResponseAdapter: UserEntityResponseAdapter,
  ) {}

  async getUsers(): Promise<User[]> {
    const userEntities = await this.userRepository.find({
      relations: {
        resources: {
          user: true,
        },
      },
    });

    return userEntities.map((userEntity) =>
      this.userEntityResponseAdapter.adaptUser(userEntity),
    );
  }

  async getUserById(id: string): Promise<User | null> {
    const userEntity = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        resources: {
          user: true,
        },
      },
    });

    if (userEntity === null) return null;
    return this.userEntityResponseAdapter.adaptUser(userEntity);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const userEntity = await this.userRepository.findOne({
      where: {
        email,
      },
      relations: {
        resources: {
          user: true,
        },
      },
    });

    if (userEntity === null) return null;
    return this.userEntityResponseAdapter.adaptUser(userEntity);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async createUser(userCreateRequest: UserCreateRequest): Promise<void> {
    const userEntity = this.userRepository.create({ ...userCreateRequest });
    await this.userRepository.save(userEntity);
  }

  async updateUser(
    userId: string,
    userUpdateRequest: UserUpdateRequest,
  ): Promise<void> {
    await this.userRepository.update(userId, userUpdateRequest);
  }
}
