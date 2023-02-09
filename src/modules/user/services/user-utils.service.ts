import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../domain/user-repository';

@Injectable()
export class UserUtilsService {
  constructor(private readonly userRepository: UserRepository) {}

  async throwIfUserDoesNotAlreadyExist(userId: string) {
    const potentialExistingUser = await this.userRepository.getUserById(userId);
    const isIdAlreadyTaken = potentialExistingUser?.id === userId;
    if (!isIdAlreadyTaken) {
      throw new NotFoundException(
        'There is no registered account under that id',
      );
    }
  }
}
