import { Controller, Get } from '@nestjs/common';

@Controller('app')
export class AppController {}
@Controller({ host: '127.0.0.1' })
export class AdminController {
  @Get()
  index(): string {
    return 'Admin page';
  }
}
