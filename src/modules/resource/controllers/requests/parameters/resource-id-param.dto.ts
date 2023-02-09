import { IsUUID } from 'class-validator';

export class ResourceIdParam {
  @IsUUID()
  resourceId: string;

  constructor(resourceId: string) {
    this.resourceId = resourceId;
  }
}
