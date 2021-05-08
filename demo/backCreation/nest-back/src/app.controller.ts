import { Controller, Get, Header, HttpCode, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getHello')
  @HttpCode(401 )
  @Header('Location', 'https://www.baidu.com')
  a(): {
    item: string;
    success: boolean;
  } {
    return {
      success: true,
      item: 'http://www.bings.com',
    };
  }
  @Post('getHello')
  @HttpCode(401 )
  @Header('Location', 'https://www.baidu.com')
  b(): {
    item: string;
    success: boolean;
  } {
    return {
      success: true,
      item: 'http://www.bings.com',
    };
  }
}
