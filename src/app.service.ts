import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public static getStatus(): { message: string } {
    return { message: 'Api up and running!' };
  }
}
