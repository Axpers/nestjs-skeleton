import { UserLoginRequest } from '../controllers/requests/user-login-request.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { UserRepository } from '../domain/user-repository';
import { User } from '../domain/user';
import { UserCreateUpdateRequest } from '../controllers/requests/user-create-update-request.dto';
import { UserUtilsService } from './user-utils.service';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private utilsService: UserUtilsService,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userRepository.getUsers();
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.getUserById(id);

    if (user === null) throw new NotFoundException('User could not be found');
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.getUser(id);
    this.userRepository.deleteUser(user.id);
  }

  async createUser(userCreateDto: UserCreateUpdateRequest): Promise<void> {
    await this.utilsService.throwIfUserAlreadyExist(userCreateDto.email);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userCreateDto.password, salt);

    await this.userRepository.createUser({
      ...userCreateDto,
      password: hashedPassword,
    });
  }

  async login(userLoginRequest: UserLoginRequest): Promise<boolean> {
    const { email, password } = userLoginRequest;
    const user = await this.userRepository.getUserByEmail(email);

    if (user === null) return false;

    const hashedPassword = user.password;
    const isPasswordMatching = await bcrypt.compare(password, hashedPassword);
    return isPasswordMatching;
  }
}
