import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/repositories/entities/user.entity';
import { ResourceControllerResponseAdapter } from './controllers/resource-controller-response.adapter';
import { ResourceController } from './controllers/resource.controller';
import { ResourceRepository } from './domain/resource-repository';
import { ResourceEntity } from './repositories/entities/resource.entity';
import { ResourceApiRepository } from './repositories/resource-api-repository';
import { ResourceEntityResponseAdapter } from './repositories/resource-repository-response.adapter';
import { ResourceUtilsService } from './services/resource/resource-utils.service';
import { ResourceService } from './services/resource/resource.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ResourceEntity])],
  controllers: [ResourceController],
  providers: [
    ResourceService,
    ResourceUtilsService,
    ResourceEntityResponseAdapter,
    ResourceControllerResponseAdapter,
    { provide: ResourceRepository, useClass: ResourceApiRepository },
  ],
  exports: [
    ResourceRepository,
    ResourceEntityResponseAdapter,
    ResourceControllerResponseAdapter,
  ],
})
export class ResourceModule {}
