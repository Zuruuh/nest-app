import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AUTH_ROUTES_PREFIX } from './auth.constants';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly authService: AuthService) {}

  // @ts-ignore
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean | Observable<boolean>> {
    const request = context.switchToHttp().getRequest<Request>();

    if (AUTH_ROUTES_PREFIX.test(request.url)) {
      return true;
    }

    const isAuthenticated = await this.authService.isAuthenticated(request);

    if (!isAuthenticated) {
      return false;
    }

    request.user = isAuthenticated;

    return true;
  }
}
