import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/repositories/entities/user.entity';
import { ResourceResponseAdapter } from './controllers/responses/resource-response.adapter';
import { ResourceController } from './controllers/resource.controller';
import { ResourceRepository } from './domain/resource-repository';
import { ResourceEntity } from './repositories/entities/resource.entity';
import { ResourceApiRepository } from './repositories/resource-api-repository';
import { ResourceEntityAdapter } from './repositories/entities/resource-entity.adapter';
import { ResourceUtilsService } from './services/resource/resource-utils.service';
import { ResourceService } from './services/resource/resource.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ResourceEntity])],
  controllers: [ResourceController],
  providers: [
    ResourceService,
    ResourceUtilsService,
    ResourceEntityAdapter,
    ResourceResponseAdapter,
    { provide: ResourceRepository, useClass: ResourceApiRepository },
  ],
  exports: [ResourceRepository, ResourceEntityAdapter, ResourceResponseAdapter],
})
export class ResourceModule {}
