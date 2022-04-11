import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  i18nValidationErrorFactory,
  I18nValidationExceptionFilter,
} from 'nestjs-i18n';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { setupSwaggerUI } from './open-api/swaggerUI';
import * as cookieParser from 'cookie-parser';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: i18nValidationErrorFactory,
    }),
  );
  app.useGlobalFilters(new I18nValidationExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await setupSwaggerUI(app);

  await app.listen(80);
}

bootstrap();
