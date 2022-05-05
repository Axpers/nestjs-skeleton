import { UserPostDTO } from './dto/user-post.dto';
import { User } from './user.entity';

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

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
    const user = await this.usersRepository.findOne(id);
    if (user) return user;
    else throw new NotFoundException();
  }

  async deleteUser(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async addUser(userPostDTO: UserPostDTO): Promise<void> {
    const { name, password } = userPostDTO;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({
      name,
      password: hashedPassword,
    });

    try {
      await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async login(userPostDTO: UserPostDTO): Promise<boolean> {
    const user = await this.usersRepository.findOne(userPostDTO.name);
    return user && (await bcrypt.compare(userPostDTO.password, user.password));
  }
}
