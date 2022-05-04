import { User } from './user.entity';
import { UserPostDTO } from './dto/user-post.dto';
import { UsersService } from './users.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.usersService.getUser(id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    this.usersService.deleteUser(id);
  }

  @Post()
  async addUser(@Body() userPostDTO: UserPostDTO): Promise<void> {
    this.usersService.addUser(userPostDTO);
  }
}
