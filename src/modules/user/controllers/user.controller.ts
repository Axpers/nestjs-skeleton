import { UserLoginDto } from './requests/user-login.dto';
import { UserService } from '../services/user.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserReponse } from './responses/user-response.dto';
import { UserDomainToControllerAdapter } from './user-domain-controller.adapter';
import { UserIdParamDto } from 'src/core/web-module/parameters/user-id-param.dto';

@Controller('users')
export class UserController {
  constructor(
    private usersService: UserService,
    private userDomainToControllerAdapter: UserDomainToControllerAdapter,
  ) {}

  @Get()
  async getUsers(): Promise<UserReponse[]> {
    const users = await this.usersService.getUsers();
    return users.map((user) =>
      this.userDomainToControllerAdapter.adaptUser(user),
    );
  }

  @Get(':userId')
  async getUser(@Param() userIdParamDto: UserIdParamDto): Promise<UserReponse> {
    const user = await this.usersService.getUser(userIdParamDto.userId);
    return this.userDomainToControllerAdapter.adaptUser(user);
  }

  @Delete(':userId')
  async deleteUser(@Param() userIdParamDto: UserIdParamDto): Promise<void> {
    this.usersService.deleteUser(userIdParamDto.userId);
  }

  @Post()
  async saveUser(@Body() userLoginDto: UserLoginDto): Promise<void> {
    this.usersService.saveUser(userLoginDto);
  }

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto): Promise<boolean> {
    return await this.usersService.login(userLoginDto);
  }
}
