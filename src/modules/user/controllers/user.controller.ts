import { UserService } from '../services/user.service';
import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UserResponse } from './responses/user-response.dto';
import { UserResponseAdapter } from './user-response.adapter';
import { UserIdParam } from 'src/modules/user/controllers/requests/parameters/user-id-param.dto';
import { UserUpdateRequest } from './requests/user-update-request.dto';
import { Roles } from 'src/core/decorators/roles.decorator';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userResponseAdapter: UserResponseAdapter,
  ) {}

  @Get()
  @Roles('admin')
  async getUsers(): Promise<UserResponse[]> {
    const users = await this.userService.getUsers();
    return users.map((user) =>
      this.userResponseAdapter.adaptUser(user),
    );
  }

  @Get(':userId')
  async getUser(@Param() userIdParam: UserIdParam): Promise<UserResponse> {
    const user = await this.userService.getUser(userIdParam.userId);
    return this.userResponseAdapter.adaptUser(user);
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
