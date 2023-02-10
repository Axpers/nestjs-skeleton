import {
  CanActivate,
  ExecutionContext,
  mixin,
  Type,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ResourceRepository } from 'src/modules/resource/domain/resource-repository';
import { User } from 'src/modules/user/domain/user';
import { RouteParametersType } from '../parameters/routes-parameters';

export const RightsGuard = (
  ...targetParameters: RouteParametersType[]
): Type<CanActivate> => {
  @Injectable()
  class RightsGuardMixin implements CanActivate {
    constructor(private readonly resourceRepository: ResourceRepository) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      console.log(targetParameters);

      const request = context.switchToHttp().getRequest();
      const requestParameters = request.params;
      const requesterUser: User = request.user;

      const isRequesterUserAdmin = requesterUser.role === 'admin';
      if (isRequesterUserAdmin) {
        return true;
      }

      const isUserTargeted = targetParameters.includes('userId');
      const targetUserId: string | undefined = requestParameters.userId;
      const hasRightsOnUser = isUserTargeted
        ? this.hasRightsOnUser(requesterUser, targetUserId)
        : true;

      const isResourceTargeted = targetParameters.includes('resourceId');
      const targetResourceId: string | undefined = requestParameters.resourceId;
      const hasRightsOnResource = isResourceTargeted
        ? this.hasRightsOnResource(requesterUser, targetResourceId)
        : true;

      return hasRightsOnUser && hasRightsOnResource;
    }

    private hasRightsOnUser(
      requesterUser: User,
      targetUserId: string | undefined,
    ): boolean {
      if (targetUserId === undefined) {
        throw new BadRequestException(
          'userId  should have been provided as a request param',
        );
      }

      const hasSameId = requesterUser.id === targetUserId;
      return hasSameId;
    }

    private async hasRightsOnResource(
      requesterUser: User,
      resourceId: string | undefined,
    ): Promise<boolean> {
      if (resourceId === undefined) {
        throw new BadRequestException(
          'resourceId should have been provided as a request param',
        );
      }

      const resource = await this.resourceRepository.getResourceById(
        resourceId,
      );
      if (resource === null) {
        throw new NotFoundException('Could not find the given resource');
      }

      const doesUserHaveRightsOnResource = requesterUser.id === resource.userId;
      return doesUserHaveRightsOnResource;
    }
  }

  const guard = mixin(RightsGuardMixin);
  return guard;
};
