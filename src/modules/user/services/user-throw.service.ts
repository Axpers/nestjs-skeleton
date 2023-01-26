import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/user-repository';

@Injectable()
export class UserThrowService {
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
}
