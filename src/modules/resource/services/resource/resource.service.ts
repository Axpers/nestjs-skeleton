import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/modules/user/domain/user';
import { ResourceCreateRequest } from '../../controllers/requests/resource-create-request.dto';
import { ResourceUpdateRequest } from '../../controllers/requests/resource-update-request.dto';
import { Resource } from '../../domain/resource';
import { ResourceRepository } from '../../domain/resource-repository';
import { ResourceUtilsService } from './resource-utils.service';

@Injectable()
export class ResourceService {
  constructor(
    private readonly resourceRepository: ResourceRepository,
    private readonly resourceUtilsService: ResourceUtilsService,
  ) {}

  async getResources(): Promise<Resource[]> {
    return this.resourceRepository.getResources();
  }

  async getResource(id: string): Promise<Resource> {
    const resource = await this.resourceRepository.getResourceById(id);

    if (resource === null)
      throw new NotFoundException('Resource could not be found');
    return resource;
  }

  async deleteResource(id: string): Promise<void> {
    const resource = await this.getResource(id);
    this.resourceRepository.deleteResource(resource.id);
  }

  async createResource(
    user: User,
    resourceCreateRequest: ResourceCreateRequest,
  ): Promise<void> {
    await this.resourceRepository.createResource(user, resourceCreateRequest);
  }

  async updateResource(
    resourceId: string,
    resourceUpdateRequest: ResourceUpdateRequest,
  ): Promise<void> {
    await this.resourceUtilsService.throwIfResourceDoesNotAlreadyExist(
      resourceId,
    );

    await this.resourceRepository.updateResource(resourceId, {
      ...resourceUpdateRequest,
    });
  }
}
