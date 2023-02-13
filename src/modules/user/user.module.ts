import { UserApiRepository } from './repositories/user-api-repository';
import { UserRepository } from './domain/user-repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { UserEntity } from './repositories/entities/user.entity';
import { UserEntityAdapter } from './repositories/entities/user-entity.adapter';
import { UserResponseAdapter } from './controllers/responses/user-response.adapter';
import { UserUtilsService } from './services/user-utils.service';
import { EncryptionService } from 'src/core/services/encryption.service';
import { AuthUtilsService } from '../auth/services/auth-utils.service';
import { ResourceEntity } from '../resource/repositories/entities/resource.entity';
import { ResourceResponseAdapter } from '../resource/controllers/responses/resource-response.adapter';
import { ResourceEntityAdapter } from '../resource/repositories/entities/resource-entity.adapter';
import { ResourceRepository } from '../resource/domain/resource-repository';
import { ResourceApiRepository } from '../resource/repositories/resource-api-repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ResourceEntity])],
  controllers: [UserController],
  providers: [
    AuthUtilsService,
    EncryptionService,
    ResourceEntityAdapter,
    ResourceResponseAdapter,
    UserService,
    UserUtilsService,
    UserEntityAdapter,
    UserResponseAdapter,
    { provide: UserRepository, useClass: UserApiRepository },
    { provide: ResourceRepository, useClass: ResourceApiRepository },
  ],
  exports: [UserRepository],
})
export class UserModule {}
