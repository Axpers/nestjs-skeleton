import { Injectable } from '@nestjs/common';
import { Resource } from '../../domain/resource';
import { ResourceEntity } from './resource.entity';

@Injectable()
export class ResourceEntityAdapter {
  adaptResource(resource: ResourceEntity): Resource {
    return {
      id: resource.id,
      description: resource.description,
      userId: resource.user.id,
    };
  }
}
