import { UserLoginDto } from '../controllers/requests/user-login.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { UserRepository } from '../domain/user-repository';
import { User } from '../domain/user';
import { UserRegisterDto } from '../controllers/requests/user-register.dto';
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

  async saveUser(userRegisterDto: UserRegisterDto): Promise<void> {
    await this.utilsService.throwIfUserAlreadyExist(userRegisterDto.email);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userRegisterDto.password, salt);

    await this.userRepository.saveUser({
      ...userRegisterDto,
      password: hashedPassword,
    });
  }

  async login(userLoginDto: UserLoginDto): Promise<boolean> {
    const { email, password } = userLoginDto;
    const user = await this.userRepository.getUserByEmail(email);

    if (user === null) return false;

    const hashedPassword = user.password;
    const isPasswordMatching = await bcrypt.compare(password, hashedPassword);
    return isPasswordMatching;
  }
}
