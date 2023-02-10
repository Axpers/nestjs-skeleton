import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/domain/user';
import { UserEntity } from 'src/modules/user/repositories/entities/user.entity';
import { Repository } from 'typeorm';
import { ResourceCreateRequest } from '../controllers/requests/resource-create-request.dto';
import { ResourceUpdateRequest } from '../controllers/requests/resource-update-request.dto';
import { Resource } from '../domain/resource';
import { ResourceRepository } from '../domain/resource-repository';
import { ResourceEntity } from './entities/resource.entity';
import { ResourceEntityAdapter } from './resource-entity.adapter';

@Injectable()
export class ResourceApiRepository implements ResourceRepository {
  constructor(
    @InjectRepository(ResourceEntity)
    private readonly resourceRepository: Repository<ResourceEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly resourceEntityAdapter: ResourceEntityAdapter,
  ) {}

  async getResources(): Promise<Resource[]> {
    const resourceEntities = await this.resourceRepository.find({
      relations: {
        user: true,
      },
    });

    return resourceEntities.map((resourceEntity) =>
      this.resourceEntityAdapter.adaptResource(resourceEntity),
    );
  }

  async getResourceById(id: string): Promise<Resource | null> {
    const resourceEntity = await this.resourceRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });

    if (resourceEntity === null) return null;
    return this.resourceEntityAdapter.adaptResource(resourceEntity);
  }

  async deleteResource(id: string): Promise<void> {
    await this.resourceRepository.delete(id);
  }

  async createResource(
    user: User,
    resourceCreateRequest: ResourceCreateRequest,
  ): Promise<void> {
    const userEntity = await this.userRepository.findOneBy({ id: user.id });

    if (userEntity === null) {
      // This case should never happen
      throw new InternalServerErrorException(
        'Authenticated and fetched user do not match',
      );
    }

    const resourceEntity = this.resourceRepository.create({
      ...resourceCreateRequest,
      user: userEntity,
    });
    await this.resourceRepository.save(resourceEntity);
  }

  async updateResource(
    resourceId: string,
    resourceUpdateRequest: ResourceUpdateRequest,
  ): Promise<void> {
    await this.resourceRepository.update(resourceId, resourceUpdateRequest);
  }
}
