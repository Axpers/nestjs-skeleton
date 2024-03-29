import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../domain/user-repository';
import { User } from '../domain/user';
import { UserUpdateRequest } from '../controllers/requests/user-update-request.dto';
import { UserUtilsService } from './user-utils.service';
import { EncryptionService } from 'src/core/services/encryption.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly utilsService: UserUtilsService,
    private readonly encryptionService: EncryptionService,
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
    await this.userRepository.deleteUser(user.id);
  }

  async updateUser(
    requesterUser: User,
    userId: string,
    userUpdateRequest: UserUpdateRequest,
  ): Promise<void> {
    await this.utilsService.throwIfEmailAlreadyTaken(
      userId,
      userUpdateRequest.email,
    );
    this.utilsService.throwIfRequesterIsNotAllowedToUpdateRoles(
      requesterUser,
      userUpdateRequest,
    );

    const hashedPassword = this.encryptionService.getHashedPassword(
      userUpdateRequest.password,
    );

    await this.userRepository.updateUser(userId, {
      ...userUpdateRequest,
      password: hashedPassword,
    });
  }
}
