import { Injectable } from '@nestjs/common';
import { Resource } from '../domain/resource';
import { ResourceEntity } from './entities/resource.entity';

@Injectable()
export class ResourceEntityResponseAdapter {
  adaptResource(resource: ResourceEntity): Resource {
    // Why was it done like this ?
    // Because typeorm return the foreign key instead of the whole user
    const userId = resource.user as unknown as string;

    return {
      id: resource.id,
      description: resource.description,
      userId,
    };
  }
}
