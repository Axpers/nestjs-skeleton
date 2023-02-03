import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/modules/user/domain/user-repository';
import * as bcrypt from 'bcrypt';

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

  async getHashedPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }
}
