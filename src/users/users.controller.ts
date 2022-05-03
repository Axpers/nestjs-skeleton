import { UserPostDTO } from './dto/user-post.dto';
import { User } from './user.model';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.getUser(id);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    this.usersService.deleteUser(id);
  }

  @Post()
  async addUser(@Body() userPostDTO: UserPostDTO): Promise<User> {
    return this.usersService.addUser(userPostDTO);
  }
}
