import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface PaginationOptions {
  limit?: number;
  offset?: number;
}

export const PagingOptions = createParamDecorator(
  (
    options: PaginationOptions = { limit: 10, offset: 0 },
    ctx: ExecutionContext,
  ) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const opts = { ...options, ...request.query };

    return {
      limit: Math.max(0, Number(opts.limit)),
      offset: Math.max(0, Number(opts.offset)),
    };
  },
);
