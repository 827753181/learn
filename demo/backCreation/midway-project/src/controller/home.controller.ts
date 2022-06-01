import { ILogger, IMidwayApplication, IMidwayContainer } from '@midwayjs/core';
import {
  App,
  ApplicationContext,
  Controller,
  Get,
  Inject,
} from '@midwayjs/decorator';
import { InfoService } from '@midwayjs/info';
import { Context } from '@midwayjs/koa';
import { ObjectLifecycleService } from '../service/objectLifecycle.service';
import { SiteService } from '../service/sites.service';
import { UserService } from '../service/user.service';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;

  @App()
  app: IMidwayApplication;

  @ApplicationContext()
  application: IMidwayContainer;

  @Inject('dynamicCacheService')
  SiteService: SiteService;

  @Inject()
  objectLifecycle: ObjectLifecycleService;

  // 上下文日志
  @Inject()
  logger: ILogger;

  @Get('/')
  async home(): Promise<string> {
    // this.logger.info('xx');
    // this.logger.debug('xx');
    // this.logger.warn('xx');
    // this.logger.error(new Error('xx'));

    // console.log(this.objectLifecycle.getConfig());
    const userServices = await this.ctx.requestContext.getAsync(UserService);
    const user = await userServices.getUser({ uid: 1 });
    return JSON.parse(JSON.stringify(user));
  }
}
