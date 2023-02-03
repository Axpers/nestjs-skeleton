import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserCreateRequest } from './requests/user-create-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async createUser(
    @Body() userCreateRequest: UserCreateRequest,
  ): Promise<void> {
    await this.authService.createUser(userCreateRequest);
  }
}
