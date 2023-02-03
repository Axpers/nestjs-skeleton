import { Injectable } from '@nestjs/common';
import { AuthUtilsService } from './auth-utils.service';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/modules/user/domain/user-repository';
import { UserCreateRequest } from '../controllers/requests/user-create-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private utilsService: AuthUtilsService,
    private userRepository: UserRepository,
  ) {}

  async createUser(userCreateDto: UserCreateRequest): Promise<void> {
    await this.utilsService.throwIfUserAlreadyExist(userCreateDto.email);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userCreateDto.password, salt);

    await this.userRepository.createUser({
      ...userCreateDto,
      password: hashedPassword,
    });
  }
}
