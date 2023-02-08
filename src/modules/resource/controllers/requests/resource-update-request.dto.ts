import { IsUUID } from 'class-validator';
import { ResourceCreateRequest } from './resource-create-request.dto';

export class ResourceUpdateRequest extends ResourceCreateRequest {
  @IsUUID()
  userId: string;

  constructor(description: string, userId: string) {
    super(description);

    this.userId = userId;
  }
}
