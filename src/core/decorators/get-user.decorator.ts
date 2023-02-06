import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/modules/user/domain/user';

export const GetUser = createParamDecorator(
  (_data, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();
    const { user } = request;

    return user;
  },
);
