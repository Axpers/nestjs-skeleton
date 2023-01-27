import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UserRepository } from '../domain/user-repository';

@Injectable()
export class UserUtilsService {
  constructor(private userRepository: UserRepository) {}

  async throwIfUserAlreadyExist(email: string) {
    const potentialExistingUser = await this.userRepository.getUserByEmail(
      email,
    );
    const isUsernameAlreadyTaken = potentialExistingUser?.email === email;
    if (isUsernameAlreadyTaken) {
      throw new ConflictException('Email already taken');
    }
  }

  async throwIfUserDoesNotAlreadyExist(userId: string) {
    const potentialExistingUser = await this.userRepository.getUserById(userId);
    const isIdAlreadyTaken = potentialExistingUser?.id === userId;
    if (!isIdAlreadyTaken) {
      throw new BadRequestException(
        'There is no registered account under that id',
      );
    }
  }
}
