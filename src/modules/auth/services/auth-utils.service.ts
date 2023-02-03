import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/modules/user/domain/user-repository';

@Injectable()
export class AuthUtilsService {
  constructor(private userRepository: UserRepository) {}

  async throwIfUserAlreadyExist(email: string): Promise<void> {
    const potentialExistingUser = await this.userRepository.getUserByEmail(
      email,
    );
    const isUsernameAlreadyTaken = potentialExistingUser?.email === email;
    if (isUsernameAlreadyTaken) {
      throw new ConflictException('Email already taken');
    }
  }
}
