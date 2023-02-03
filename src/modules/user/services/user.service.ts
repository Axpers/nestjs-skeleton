import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../domain/user-repository';
import { User } from '../domain/user';
import { UserUpdateRequest } from '../controllers/requests/user-update-request.dto';
import { UserUtilsService } from './user-utils.service';
import { AuthUtilsService } from 'src/modules/auth/services/auth-utils.service';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private userUtilsService: UserUtilsService,
    private authUtilsService: AuthUtilsService,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.getUsers();
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.getUserById(id);

    if (user === null) throw new NotFoundException('User could not be found');
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.getUser(id);
    this.userRepository.deleteUser(user.id);
  }

  async updateUser(
    userId: string,
    userUpdateRequest: UserUpdateRequest,
  ): Promise<void> {
    await this.userUtilsService.throwIfUserDoesNotAlreadyExist(userId);

    const hashedPassword = await this.authUtilsService.getHashedPassword(
      userUpdateRequest.password,
    );

    await this.userRepository.updateUser(userId, {
      ...userUpdateRequest,
      password: hashedPassword,
    });
  }
}
