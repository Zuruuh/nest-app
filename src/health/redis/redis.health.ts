import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
  public constructor(@InjectRedis() private readonly redis: Redis) {
    super();
  }

  public async ping(key: string): Promise<HealthIndicatorResult> {
    const isHealthy = await this.redis.ping();
    const result = this.getStatus(key, !!isHealthy);

    if (isHealthy) {
      return result;
    }

    throw new HealthCheckError('Redis is unavailable', result);
  }
}
