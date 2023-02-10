import { UserApiRepository } from './repositories/user-api-repository';
import { UserRepository } from './domain/user-repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserEntity } from './repositories/entities/user.entity';
import { UserEntityAdapter } from './repositories/user-entity.adapter';
import { UserResponseAdapter } from './controllers/user-response.adapter';
import { UserUtilsService } from './services/user-utils.service';
import { EncryptionService } from 'src/core/services/encryption.service';
import { ResourceModule } from '../resource/resource.module';

@Module({
  imports: [ResourceModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    EncryptionService,
    UserService,
    UserUtilsService,
    UserEntityAdapter,
    UserResponseAdapter,
    { provide: UserRepository, useClass: UserApiRepository },
  ],
  exports: [UserRepository],
})
export class UserModule {}
