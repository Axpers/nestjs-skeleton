import { Injectable } from '@nestjs/common';
import { AuthUtilsService } from './auth-utils.service';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/modules/user/domain/user-repository';
import { UserCreateRequest } from '../controllers/requests/user-create-request.dto';
import { UserLoginRequest } from '../controllers/requests/user-login-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private utilsService: AuthUtilsService,
    private userRepository: UserRepository,
  ) {}

  async createUser(userCreateDto: UserCreateRequest): Promise<void> {
    await this.utilsService.throwIfUserAlreadyExist(userCreateDto.email);

    const hashedPassword = await this.utilsService.getHashedPassword(
      userCreateDto.password,
    );

    await this.userRepository.createUser({
      ...userCreateDto,
      password: hashedPassword,
    });
  }

  async login(userLoginRequest: UserLoginRequest): Promise<boolean> {
    const { email, password } = userLoginRequest;
    const user = await this.userRepository.getUserByEmail(email);

    if (user === null) return false;

    const hashedPassword = user.password;
    const isPasswordMatching = await bcrypt.compare(password, hashedPassword);
    return isPasswordMatching;
  }
}
