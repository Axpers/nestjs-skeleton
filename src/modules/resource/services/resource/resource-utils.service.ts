import { Injectable, NotFoundException } from '@nestjs/common';

import { ResourceRepository } from '../../domain/resource-repository';

@Injectable()
export class ResourceUtilsService {
  constructor(private readonly resourceRepository: ResourceRepository) {}

  async throwIfResourceDoesNotAlreadyExist(resourceId: string) {
    const doesResourceExist = await this.resourceRepository.getResourceById(
      resourceId,
    );

    if (!doesResourceExist) {
      throw new NotFoundException('There is no resource under that id');
    }
  }
}
