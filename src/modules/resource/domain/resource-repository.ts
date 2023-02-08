import { ResourceCreateRequest } from '../controllers/requests/resource-create-request.dto';
import { ResourceUpdateRequest } from '../controllers/requests/resource-update-request.dto';
import { Resource } from './resource';

export abstract class ResourceRepository {
  abstract getResources(): Promise<Resource[]>;

  abstract getResourceById(id: string): Promise<Resource | null>;

  abstract deleteResource(id: string): Promise<void>;

  abstract createResource(
    resourceCreateRequest: ResourceCreateRequest,
  ): Promise<void>;

  abstract updateResource(
    resourceId: string,
    resourceUpdateRequest: ResourceUpdateRequest,
  ): Promise<void>;
}
