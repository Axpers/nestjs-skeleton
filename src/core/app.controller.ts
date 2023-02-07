import { Controller, Get } from '@nestjs/common';
import { SkipAuth } from 'src/core/decorators/skip-auth.decorator';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @SkipAuth()
  getHealth(): string {
    return 'Health ok !';
  }
}
