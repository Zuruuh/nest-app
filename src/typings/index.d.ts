import { Request as ExpressRequest } from 'express';
import { User } from './user/user.entity';

declare module 'express' {
  export interface Request extends ExpressRequest {
    user: ?User;
    cookies: Record<PropertyKey, any>;
  }
}
