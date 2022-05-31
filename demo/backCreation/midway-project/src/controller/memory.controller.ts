import { Controller, Get, Inject } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { MemoryDataListener } from '../listener/memory.listener';

@Controller('/memory')
export class HomeController {
  @Inject()
  ctx: Context;
  @Inject()
  memoryDataListener: MemoryDataListener;

  @Get('/')
  async home(): Promise<any> {
    return this.memoryDataListener.getData();
  }
}
