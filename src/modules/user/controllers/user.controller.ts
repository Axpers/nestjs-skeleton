import { UserService } from '../services/user.service';
import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UserResponse } from './responses/user-response.dto';
import { UserControllerResponseAdapter } from './user-controller-response.adapter';
import { UserIdParam } from 'src/core/parameters/user-id-param.dto';
import { UserUpdateRequest } from './requests/user-update-request.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userControllerResponseAdapter: UserControllerResponseAdapter,
  ) {}

  @Get()
  async getUsers(): Promise<UserResponse[]> {
    const users = await this.userService.getUsers();
    return users.map((user) =>
      this.userControllerResponseAdapter.adaptUser(user),
    );
  }

  @Get(':userId')
  async getUser(@Param() userIdParam: UserIdParam): Promise<UserResponse> {
    const user = await this.userService.getUser(userIdParam.userId);
    return this.userControllerResponseAdapter.adaptUser(user);
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
}
