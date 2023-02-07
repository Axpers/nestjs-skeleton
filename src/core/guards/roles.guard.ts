import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User, UserRole } from 'src/modules/user/domain/user';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const areThereRequiredRoles = requiredRoles !== undefined;
    if (!areThereRequiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as User;

    const isUserAdmin = user.role === 'admin';
    if (isUserAdmin) {
      return true;
    }

    const hasRegularUserAtLeastOneRequiredRole = requiredRoles.some(
      (role) => user.role === role,
    );
    return hasRegularUserAtLeastOneRequiredRole;
  }
}
