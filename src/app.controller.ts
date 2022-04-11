import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  @Get()
  public up(): ReturnType<typeof AppService.getStatus> {
    return AppService.getStatus();
  }
}
