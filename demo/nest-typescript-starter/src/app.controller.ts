import { Controller, Get } from '@nestjs/common';

@Controller('app')
export class AppController {
  @Get()
  index(): string {
    return 'Admin page';
  }
}
