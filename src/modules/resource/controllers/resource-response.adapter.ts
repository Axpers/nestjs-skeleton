import { Injectable } from '@nestjs/common';
import { Resource } from '../domain/resource';
import { ResourceResponse } from './responses/resource-response.dto';

@Injectable()
export class ResourceResponseAdapter {
  adaptResource(resource: Resource): ResourceResponse {
    return {
      id: resource.id,
      description: resource.description,
      userId: resource.userId,
    };
  }

  adaptResourceForUserResponse(resource: Resource): ResourceResponse {
    return {
      id: resource.id,
      description: resource.description,
    };
  }
}
