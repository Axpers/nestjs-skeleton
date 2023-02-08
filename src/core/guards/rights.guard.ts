import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RightsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const requestParams = request.params;

    const resourceId = requestParams.resourceId;
    if (resourceId === undefined) {
      throw new BadRequestException(
        'resourceId should have been provided as request param',
      );
    }

    // const resource = FETCH RESOURCE VIA ID FROM REPOSITORY
    // if (resource === undefined) {
    //   throw new NotFoundException('Could not find the given resource');
    // }

    // const user = request.user as User;
    // const isUserAdmin = user.role === 'admin';
    // if (isUserAdmin) {
    //   return true;
    // }

    // Check if user has rights on it

    return true;
  }
}
