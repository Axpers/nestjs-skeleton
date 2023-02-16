import {
  CanActivate,
  ExecutionContext,
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ResourceRepository } from 'src/modules/resource/domain/resource-repository';
import { User } from 'src/modules/user/domain/user';
import { UserRepository } from 'src/modules/user/domain/user-repository';
import { RIGHTS_KEY } from '../decorators/rights.decorator';
import {
  RouteParameters,
  RouteParametersType,
} from '../parameters/route-parameters';

@Injectable()
export class RightsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userRepository: UserRepository,
    private readonly resourceRepository: ResourceRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRights = this.reflector.getAllAndOverride<
      RouteParametersType[]
    >(RIGHTS_KEY, [context.getHandler(), context.getClass()]);

    const areThereRequiredRights = requiredRights !== undefined;
    if (!areThereRequiredRights) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const requestParameters = request.params;
    const requesterUser: User = request.user;

    const isRequesterUserAdmin = requesterUser.role === 'admin';
    if (isRequesterUserAdmin) {
      return true;
    }

    const isUserTargeted = requiredRights.includes('userId');
    const targetUserId: string | undefined =
      requestParameters[RouteParameters.UserId];
    const hasRightsOnUser = isUserTargeted
      ? await this.hasRightsOnUser(requesterUser, targetUserId)
      : true;

    const isResourceTargeted = requiredRights.includes('resourceId');
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

    const resource = await this.resourceRepository.getResourceById(resourceId);
    if (resource === null) {
      throw new NotFoundException('Could not find the given resource');
    }

    const doesUserHaveRightsOnResource = requesterUser.id === resource.userId;
    return doesUserHaveRightsOnResource;
  }
}
