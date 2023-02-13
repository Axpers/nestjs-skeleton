import { User } from 'src/modules/user/domain/user';
import { ResourceCreateRequest } from '../controllers/requests/resource-create-request.dto';
import { ResourceUpdateRequest } from '../controllers/requests/resource-update-request.dto';
import { Resource } from './resource';

export abstract class ResourceRepository {
  abstract getResources(): Promise<Resource[]>;

  abstract getResourcesByUser(user: User): Promise<Resource[]>;

  abstract getResourceById(id: string): Promise<Resource | null>;

  abstract deleteResource(id: string): Promise<void>;

  abstract createResource(
    user: User,
    resourceCreateRequest: ResourceCreateRequest,
  ): Promise<void>;

  abstract updateResource(
    resourceId: string,
    resourceUpdateRequest: ResourceUpdateRequest,
  ): Promise<void>;
}
