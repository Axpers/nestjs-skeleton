import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLoginDto } from '../controllers/requests/user-login.dto';
import { User } from '../domain/user';
import { UserRepository } from '../domain/user-repository';
import { UserEntity } from './entities/user.entity';
import { UserEntityToDomainAdapter } from './user-entity-domain.adapter';

@Injectable()
export class UserApiRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private userEntityToDomainAdapter: UserEntityToDomainAdapter,
  ) {}

  async getUsers(): Promise<User[]> {
    const userEntities = await this.userRepository.find();

    return userEntities.map((userEntity) =>
      this.userEntityToDomainAdapter.adaptUser(userEntity),
    );
  }

  async getUserById(id: string): Promise<User | null> {
    const userEntity = await this.userRepository.findOneBy({ id });

    if (userEntity === null) return null;
    return this.userEntityToDomainAdapter.adaptUser(userEntity);
  }

  async getUserByName(name: string): Promise<User | null> {
    const userEntity = await this.userRepository.findOneBy({ name });

    if (userEntity === null) return null;
    return this.userEntityToDomainAdapter.adaptUser(userEntity);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async saveUser(userLoginDto: UserLoginDto): Promise<void> {
    const potentialExistingUser = await this.getUserByName(userLoginDto.name);
    const isUsernameAlreadyTaken =
      potentialExistingUser?.name === userLoginDto.name;
    if (isUsernameAlreadyTaken) {
      throw new ConflictException('Username already taken');
    }

    const userEntity = this.userRepository.create({
      name: userLoginDto.name,
      password: userLoginDto.password,
    });

    await this.userRepository.save(userEntity);
  }
}
