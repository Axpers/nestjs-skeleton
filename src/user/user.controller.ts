import { UserPostDTO } from './dto/userPost.dto';
import { User } from './user.model';
import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id): User {
    return this.userService.getUser(Number(id));
  }

  @Delete(':id')
  deleteUser(@Param('id') id): void {
    this.userService.deleteUser(Number(id));
  }

  @Post()
  addUser(@Body() userPostDTO: UserPostDTO): User {
    return this.userService.addUser(userPostDTO);
  }
}
