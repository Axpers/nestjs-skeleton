import { UserLoginDto } from './requests/user-login.dto';
import { UserService } from '../services/user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UserReponse } from './responses/user-response.dto';
import { UserDomainToControllerAdapter } from './user-domain-controller.adapter';

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

  @Get(':id')
  async getUser(@Param('id', ParseUUIDPipe) id: string): Promise<UserReponse> {
    const user = await this.usersService.getUser(id);
    return this.userDomainToControllerAdapter.adaptUser(user);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    this.usersService.deleteUser(id);
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
