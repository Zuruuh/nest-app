import {
  Body,
  Controller,
  Post,
  HttpException,
  Res,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { LoginDTO } from './dto/LoginDTO';
import { RegistrationDTO } from './dto/RegistrationDTO';
import { AuthService } from './auth.service';
import { instanceToPlain } from 'class-transformer';
import { I18n, I18nContext } from 'nestjs-i18n';
import { Request, Response } from 'express';
import { Req } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  public constructor(private authService: AuthService) {}

  @Post('login')
  public async loginAction(
    @Body() data: LoginDTO,
    @I18n() i18n: I18nContext,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.login(data);

    if (!user) {
      throw new HttpException(i18n.t('auth.invalid_credentials'), 400);
    }

    const token = await this.authService.authenticate(response, user);

    return {
      user: instanceToPlain(user, { groups: ['self'] }),
      token,
    };
  }

  @Post('register')
  public async registerAction(@Body() data: RegistrationDTO) {
    const user = await this.authService.register(data);

    return instanceToPlain(user, { groups: ['self'] });
  }

  @Delete('logout')
  @HttpCode(204)
  public async logout(
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<void> {
    await this.authService.logout(request, response);
  }
}
