import { UserPostDTO } from './dto/user-post.dto';
import { User } from './user.model';
import { UsersService } from './users.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id): User {
    return this.usersService.getUser(Number(id));
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): void {
    this.usersService.deleteUser(Number(id));
  }

  @Post()
  addUser(@Body() userPostDTO: UserPostDTO): User {
    return this.usersService.addUser(userPostDTO);
  }
}
