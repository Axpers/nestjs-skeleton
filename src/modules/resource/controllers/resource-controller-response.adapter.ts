import { Injectable } from '@nestjs/common';
import { Resource } from '../domain/resource';
import { ResourceResponse } from './responses/resource-response.dto';

@Injectable()
export class ResourceControllerResponseAdapter {
  adaptResource(resource: Resource, forUserResponse = false): ResourceResponse {
    const userId = forUserResponse ? undefined : resource.userId;

    return {
      id: resource.id,
      description: resource.description,
      userId,
    };
  }
}
