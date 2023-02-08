import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResourceCreateRequest } from '../controllers/requests/resource-create-request.dto';
import { ResourceUpdateRequest } from '../controllers/requests/resource-update-request.dto';
import { Resource } from '../domain/resource';
import { ResourceRepository } from '../domain/resource-repository';
import { ResourceEntity } from './entities/resource.entity';
import { ResourceEntityResponseAdapter } from './resource-repository-response.adapter';

@Injectable()
export class ResourceApiRepository implements ResourceRepository {
  constructor(
    @InjectRepository(ResourceEntity)
    private readonly resourceRepository: Repository<ResourceEntity>,
    private readonly resourceEntityResponseAdapter: ResourceEntityResponseAdapter,
  ) {}

  async getResources(): Promise<Resource[]> {
    const resourceEntities = await this.resourceRepository.find();

    return resourceEntities.map((resourceEntity) =>
      this.resourceEntityResponseAdapter.adaptResource(resourceEntity),
    );
  }

  async getResourceById(id: string): Promise<Resource | null> {
    const resourceEntity = await this.resourceRepository.findOneBy({ id });

    if (resourceEntity === null) return null;
    return this.resourceEntityResponseAdapter.adaptResource(resourceEntity);
  }

  async deleteResource(id: string): Promise<void> {
    await this.resourceRepository.delete(id);
  }

  async createResource(
    resourceCreateRequest: ResourceCreateRequest,
  ): Promise<void> {
    const resourceEntity = this.resourceRepository.create({
      ...resourceCreateRequest,
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
