import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ResourceRepository } from 'src/modules/resource/domain/resource-repository';
import { User } from 'src/modules/user/domain/user';

@Injectable()
export class RightsGuard implements CanActivate {
  constructor(private readonly resourceRepository: ResourceRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const requestParams = request.params;

    const resourceId = requestParams.resourceId;
    if (resourceId === undefined) {
      throw new BadRequestException(
        'resourceId should have been provided as request param',
      );
    }

    const resource = await this.resourceRepository.getResourceById(resourceId);
    if (resource === null) {
      throw new NotFoundException('Could not find the given resource');
    }

    const user = request.user as User;
    const isUserAdmin = user.role === 'admin';
    if (isUserAdmin) {
      return true;
    }

    const doesUserHaveRightsOnResource = resource.userId === resource.userId;
    return doesUserHaveRightsOnResource;
  }
}
