import { User } from './user.model';
import { UserService } from './user.service';
import { Controller, Get, Param } from '@nestjs/common';

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
}
