import { UserService } from '../services/user.service';
import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UserResponse } from './responses/user-response.dto';
import { UserResponseAdapter } from './responses/user-response.adapter';
import { UserIdParam } from 'src/modules/user/controllers/requests/parameters/user-id-param.dto';
import { UserUpdateRequest } from './requests/user-update-request.dto';
import { Roles } from 'src/core/decorators/roles.decorator';
import { RouteParameters } from 'src/core/parameters/route-parameters';
import { GetUser } from 'src/core/decorators/get-user.decorator';
import { User } from '../domain/user';
import { Rights } from 'src/core/decorators/rights.decorator';

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
    return users.map((user) => this.userResponseAdapter.adaptUser(user));
  }

  @Get(`:${RouteParameters.UserId}`)
  @Rights('userId')
  async getUser(@Param() userIdParam: UserIdParam): Promise<UserResponse> {
    const user = await this.userService.getUser(userIdParam.userId);
    return this.userResponseAdapter.adaptUser(user);
  }

  @Delete(`:${RouteParameters.UserId}`)
  @Rights('userId')
  async deleteUser(@Param() userIdParam: UserIdParam): Promise<void> {
    await this.userService.deleteUser(userIdParam.userId);
  }

  @Put(`:${RouteParameters.UserId}`)
  @Rights('userId')
  async updateUser(
    @Param() userIdParam: UserIdParam,
    @Body() userUpdateRequest: UserUpdateRequest,
    @GetUser() requesterUser: User,
  ): Promise<void> {
    await this.userService.updateUser(
      requesterUser,
      userIdParam.userId,
      userUpdateRequest,
    );
  }
}
