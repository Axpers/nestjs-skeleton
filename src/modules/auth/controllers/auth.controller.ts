import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserCreateRequest } from './requests/user-create-request.dto';
import { UserLoginRequest } from './requests/user-login-request.dto';
import { AccessTokenResponse } from './responses/access-token-response-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async createUser(
    @Body() userCreateRequest: UserCreateRequest,
  ): Promise<void> {
    await this.authService.createUser(userCreateRequest);
  }

  @Post('login')
  async login(
    @Body() userLoginRequest: UserLoginRequest,
  ): Promise<AccessTokenResponse> {
    const accessToken = await this.authService.login(userLoginRequest);
    return { accessToken };
  }
}
