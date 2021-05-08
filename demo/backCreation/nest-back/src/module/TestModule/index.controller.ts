import { Controller, Get } from '@nestjs/common';
import { TestService } from './index.service';

@Controller('test')
export class TestController {
  constructor(private readonly TestService: TestService) {}

  @Get('test1')
  test(): {
    item: string;
    success: boolean;
  } {
    return {
      success: true,
      item: 'http://www.bings.com',
    };
  }
}
