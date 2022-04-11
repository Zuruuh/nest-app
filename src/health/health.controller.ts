import { Controller, Get } from '@nestjs/common';
import { RedisHealthIndicator } from './redis/redis.health';
import {
  HealthCheckService,
  TypeOrmHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  public constructor(
    private readonly health: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
    private readonly redis: RedisHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  public check() {
    return this.health.check([
      async () => await this.db.pingCheck('database'),
      async () => await this.redis.ping('redis'),
    ]);
  }
}
