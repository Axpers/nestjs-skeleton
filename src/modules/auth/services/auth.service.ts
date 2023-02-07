import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthUtilsService } from './auth-utils.service';
import { UserRepository } from 'src/modules/user/domain/user-repository';
import { UserCreateRequest } from '../controllers/requests/user-create-request.dto';
import { UserLoginRequest } from '../controllers/requests/user-login-request.dto';
import { EncryptionService } from 'src/core/services/encryption.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly utilsService: AuthUtilsService,
    private readonly userRepository: UserRepository,
    private readonly encryptionService: EncryptionService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(userCreateDto: UserCreateRequest): Promise<void> {
    await this.utilsService.throwIfUserAlreadyExist(userCreateDto.email);

    const hashedPassword = this.encryptionService.getHashedPassword(
      userCreateDto.password,
    );

    await this.userRepository.createUser({
      ...userCreateDto,
      password: hashedPassword,
    });
  }

  async login(userLoginRequest: UserLoginRequest): Promise<string> {
    const { email, password } = userLoginRequest;

    const user = await this.userRepository.getUserByEmail(email);
    if (user === null) {
      throw new UnauthorizedException('Credentials are invalid');
    }

    const hashedPassword = user.password;
    const arePasswordsMatching = this.encryptionService.arePasswordsMatching(
      password,
      hashedPassword,
    );

    if (!arePasswordsMatching) {
      throw new UnauthorizedException('Credentials are invalid');
    }

    const payload = this.utilsService.getJwtPayload(user);
    const accessToken = this.jwtService.sign(payload);

    return accessToken;
  }
}
