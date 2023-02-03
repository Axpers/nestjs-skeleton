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

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    UserUtilsService,
    UserEntityReponseAdapter,
    UserControllerReponseAdapter,
    { provide: UserRepository, useClass: UserApiRepository },
  ],
  exports: [UserRepository],
})
export class UserModule {}
