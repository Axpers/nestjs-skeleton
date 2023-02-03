import { Injectable } from '@nestjs/common';
import { UserCreateUpdateRequest } from 'src/modules/user/controllers/requests/user-create-update-request.dto';
import { AuthUtilsService } from './auth-utils.service';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/modules/user/domain/user-repository';

@Injectable()
export class AuthService {
  constructor(
    private utilsService: AuthUtilsService,
    private userRepository: UserRepository,
  ) {}

  async createUser(userCreateDto: UserCreateUpdateRequest): Promise<void> {
    await this.utilsService.throwIfUserAlreadyExist(userCreateDto.email);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userCreateDto.password, salt);

    await this.userRepository.createUser({
      ...userCreateDto,
      password: hashedPassword,
    });
  }
}
