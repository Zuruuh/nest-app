import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
} from 'nestjs-i18n';
import { resolve } from 'path';
import { HealthModule } from './health/health.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { BlogModule } from './blog/blog.module';

const APP_MODULES = [UserModule, AuthModule, HealthModule];

const DEPENDENCIES_MODULES = [
  TypeOrmModule.forRoot(),
  I18nModule.forRoot({
    fallbackLanguage: 'en',
    fallbacks: {
      'fr-*': 'fr',
      'en-*': 'en',
    },
    loaderOptions: {
      path: resolve(__dirname, 'i18n'),
      watch: true,
    },
    resolvers: [
      { use: HeaderResolver, options: ['x-lang'] },
      AcceptLanguageResolver,
    ],
  }),
  RedisModule.forRoot({
    closeClient: true,
    config: {
      url: process.env.REDIS_URL,
    },
  }),
];

@Module({
  imports: [...APP_MODULES, ...DEPENDENCIES_MODULES, BlogModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
