import {
  CanActivate,
  ExecutionContext,
  mixin,
  Type,
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { ResourceRepository } from 'src/modules/resource/domain/resource-repository';
import { User } from 'src/modules/user/domain/user';
import { UserRepository } from 'src/modules/user/domain/user-repository';
import {
  RouteParameters,
  RouteParametersType,
} from '../parameters/route-parameters';

export const RightsGuard = (
  ...targetParameters: RouteParametersType[]
): Type<CanActivate> => {
  @Injectable()
  class RightsGuardMixin implements CanActivate {
    constructor(
      private readonly userRepository: UserRepository,
      private readonly resourceRepository: ResourceRepository,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const requestParameters = request.params;
      const requesterUser: User = request.user;

      const isRequesterUserAdmin = requesterUser.role === 'admin';
      if (isRequesterUserAdmin) {
        return true;
      }

      const isUserTargeted = targetParameters.includes('userId');
      const targetUserId: string | undefined =
        requestParameters[RouteParameters.UserId];
      const hasRightsOnUser = isUserTargeted
        ? await this.hasRightsOnUser(requesterUser, targetUserId)
        : true;

      const isResourceTargeted = targetParameters.includes('resourceId');
      const targetResourceId: string | undefined =
        requestParameters[RouteParameters.ResourceId];
      const hasRightsOnResource = isResourceTargeted
        ? await this.hasRightsOnResource(requesterUser, targetResourceId)
        : true;

      return hasRightsOnUser && hasRightsOnResource;
    }

    private async hasRightsOnUser(
      requesterUser: User,
      targetUserId: string | undefined,
    ): Promise<boolean> {
      if (targetUserId === undefined) {
        throw new BadRequestException(
          'userId should have been provided as a request param',
        );
      }

      const targetUser = await this.userRepository.getUserById(targetUserId);
      if (targetUser === null) {
        console.log('inside rights guard, where targetUser is null');

        throw new NotFoundException('Could not find the given user');
      }

      const hasSameId = requesterUser.id === targetUser.id;
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
