import { UserPostDTO } from './dto/user-post.dto';
import { User } from './user.entity';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async getUser(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async deleteUser(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async addUser(userPostDTO: UserPostDTO): Promise<User> {
    return this.usersRepository.save(userPostDTO);
  }
}
