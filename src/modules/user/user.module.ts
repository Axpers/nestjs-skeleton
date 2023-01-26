import { UserApiRepository } from './repositories/user-api-repository';
import { UserRepository } from './domain/user-repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserEntity } from './repositories/entities/user.entity';
import { UserEntityToDomainAdapter } from './repositories/user-entity-domain.adapter';
import { UserDomainToControllerAdapter } from './controllers/user-domain-controller.adapter';
import { UserThrowService } from './services/user-throw.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    UserThrowService,
    UserEntityToDomainAdapter,
    UserDomainToControllerAdapter,
    { provide: UserRepository, useClass: UserApiRepository },
  ],
})
export class UserModule {}
