import { UserService } from '../services/user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserReponse } from './responses/user-response.dto';
import { UserControllerReponseAdapter } from './user-controller-response.adapter';
import { UserIdParam } from 'src/core/parameters/user-id-param.dto';
import { UserUpdateRequest } from './requests/user-update-request.dto';
import { UserLoginRequest } from './requests/user-login-request.dto';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private userControllerReponseAdapter: UserControllerReponseAdapter,
  ) {}

  @Get()
  async getUsers(): Promise<UserReponse[]> {
    const users = await this.userService.getUsers();
    return users.map((user) =>
      this.userControllerReponseAdapter.adaptUser(user),
    );
  }

  @Get(':userId')
  async getUser(@Param() userIdParam: UserIdParam): Promise<UserReponse> {
    const user = await this.userService.getUser(userIdParam.userId);
    return this.userControllerReponseAdapter.adaptUser(user);
  }

  @Delete(':userId')
  async deleteUser(@Param() userIdParam: UserIdParam): Promise<void> {
    await this.userService.deleteUser(userIdParam.userId);
  }

  @Put(':userId')
  async updateUser(
    @Param() userIdParam: UserIdParam,
    @Body() userUpdateRequest: UserUpdateRequest,
  ): Promise<void> {
    await this.userService.updateUser(userIdParam.userId, userUpdateRequest);
  }

  @Post('login')
  async login(@Body() userLoginRequest: UserLoginRequest): Promise<boolean> {
    return await this.userService.login(userLoginRequest);
  }
}
