import { UserService } from '../services/user.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserReponse } from './responses/user-response.dto';
import { UserControllerReponseAdapter } from './user-controller-response.adapter';
import { UserIdParamDto } from 'src/core/web-module/parameters/user-id-param.dto';
import { UserCreateUpdateRequest } from './requests/user-create-update-request.dto';
import { UserLoginRequest } from './requests/user-login-request.dto';

@Controller('users')
export class UserController {
  constructor(
    private usersService: UserService,
    private userControllerReponseAdapter: UserControllerReponseAdapter,
  ) {}

  @Get()
  async getUsers(): Promise<UserReponse[]> {
    const users = await this.usersService.getUsers();
    return users.map((user) =>
      this.userControllerReponseAdapter.adaptUser(user),
    );
  }

  @Get(':userId')
  async getUser(@Param() userIdParamDto: UserIdParamDto): Promise<UserReponse> {
    const user = await this.usersService.getUser(userIdParamDto.userId);
    return this.userControllerReponseAdapter.adaptUser(user);
  }

  @Delete(':userId')
  async deleteUser(@Param() userIdParamDto: UserIdParamDto): Promise<void> {
    await this.usersService.deleteUser(userIdParamDto.userId);
  }

  @Post('register')
  async saveUser(
    @Body() userCreateRequest: UserCreateUpdateRequest,
  ): Promise<void> {
    await this.usersService.createUser(userCreateRequest);
  }

  @Post('login')
  async login(@Body() userLoginRequest: UserLoginRequest): Promise<boolean> {
    return await this.usersService.login(userLoginRequest);
  }
}
