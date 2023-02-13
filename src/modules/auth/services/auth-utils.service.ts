import { ConflictException, Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/domain/user';
import { UserRepository } from 'src/modules/user/domain/user-repository';
import { JwtPayload } from '../domain/jwt-payload';

@Injectable()
export class AuthUtilsService {
  constructor(private readonly userRepository: UserRepository) {}

  async throwIfEmailAlreadyTaken(email: string): Promise<void> {
    const potentialExistingUser = await this.userRepository.getUserByEmail(
      email,
    );
    const isUsernameAlreadyTaken = potentialExistingUser?.email === email;
    if (isUsernameAlreadyTaken) {
      throw new ConflictException('Email already taken');
    }
  }

  getJwtPayload(user: User): JwtPayload {
    return {
      id: user.id,
      email: user.email,
    };
  }
}
