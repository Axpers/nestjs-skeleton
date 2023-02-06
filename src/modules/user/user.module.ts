import { UserApiRepository } from './repositories/user-api-repository';
import { UserRepository } from './domain/user-repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserEntity } from './repositories/entities/user.entity';
import { UserEntityReponseAdapter } from './repositories/user-repository-reponse.adapter';
import { UserControllerReponseAdapter } from './controllers/user-controller-response.adapter';
import { UserUtilsService } from './services/user-utils.service';
import { EncryptionService } from 'src/core/services/encryption.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    EncryptionService,
    UserService,
    UserUtilsService,
    UserEntityReponseAdapter,
    UserControllerReponseAdapter,
    { provide: UserRepository, useClass: UserApiRepository },
  ],
  exports: [UserRepository, UserControllerReponseAdapter],
})
export class UserModule {}
