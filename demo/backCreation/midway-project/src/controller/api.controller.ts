import { Inject, Controller, Get, Query, App } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import Application = require('koa');
import { SiteService } from '../service/sites.service';
import { UserService } from '../service/user.service';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @App()
  app: Application;

  @Inject()
  userService: UserService;
  @Inject()
  siteService: SiteService;
  @Inject('lodash')
  lodash;

  @Get('/')
  async getApi() {
    return this.lodash.sum([1, 2]);
  }

  // 明确的路由优先级最高，长的路由优先级高，通配的优先级最低 ,优先级相同，先加载的优先
  @Get('/:id/page')
  async getPage1(@Query('id') id) {
    return 'hello1';
  }
  @Get('/page/*')
  async getPage2(@Query('id') id) {
    return 'hello2';
  }

  @Get('/get_sites')
  async getSites(@Query('id') id) {
    const site = await this.siteService.getSite({ id });
    return site;
  }

  @Get('/get_user')
  async getUser(@Query('uid') uid) {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }
}
