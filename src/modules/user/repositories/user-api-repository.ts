import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRegisterDto } from '../controllers/requests/user-register.dto';
import { User } from '../domain/user';
import { UserRepository } from '../domain/user-repository';
import { UserEntity } from './entities/user.entity';
import { UserEntityReponseAdapter } from './user-repository-reponse.adapter';

@Injectable()
export class UserApiRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private userEntityReponseAdapter: UserEntityReponseAdapter,
  ) {}

  async getUsers(): Promise<User[]> {
    const userEntities = await this.userRepository.find();

    return userEntities.map((userEntity) =>
      this.userEntityReponseAdapter.adaptUser(userEntity),
    );
  }

  async getUserById(id: string): Promise<User | null> {
    const userEntity = await this.userRepository.findOneBy({ id });

    if (userEntity === null) return null;
    return this.userEntityReponseAdapter.adaptUser(userEntity);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const userEntity = await this.userRepository.findOneBy({ email });

    if (userEntity === null) return null;
    return this.userEntityReponseAdapter.adaptUser(userEntity);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async saveUser(userRegisterDto: UserRegisterDto): Promise<void> {
    const userEntity = this.userRepository.create({ ...userRegisterDto });
    await this.userRepository.save(userEntity);
  }
}
