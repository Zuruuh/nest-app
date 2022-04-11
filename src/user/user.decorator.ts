import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): User | null => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  },
);
