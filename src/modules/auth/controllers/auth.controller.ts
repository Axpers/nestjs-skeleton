import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateUpdateRequest } from 'src/modules/user/controllers/requests/user-create-update-request.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async createUser(
    @Body() userCreateRequest: UserCreateUpdateRequest,
  ): Promise<void> {
    await this.authService.createUser(userCreateRequest);
  }
}
