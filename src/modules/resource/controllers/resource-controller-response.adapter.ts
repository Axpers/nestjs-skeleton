import { Injectable } from '@nestjs/common';
import { Resource } from '../domain/resource';
import { ResourceResponse } from './responses/resource-response.dto';

@Injectable()
export class ResourceControllerResponseAdapter {
  adaptResource(
    resource: Resource,
    isForUserResponse = false,
  ): ResourceResponse {
    const userId = isForUserResponse ? undefined : resource.userId;

    return {
      id: resource.id,
      description: resource.description,
      userId,
    };
  }
}
