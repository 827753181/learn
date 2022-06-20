import { Inject, Controller, Get, Query, App } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import Application = require('koa');
import { SiteService } from '../service/sites.service';
import { UserService } from '../service/user.service';
import { MidwayI18nService } from '@midwayjs/i18n';
import { userDto } from '../dto/user';
import { Validate } from '@midwayjs/validate';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @App()
  app: Application;
  @Inject()
  midwayI18nService: MidwayI18nService;

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
  @Validate({})
  async getUser(@Query() query: userDto) {
    const user = await this.userService.getUser({ uid: query.uid });
    return { success: true, message: 'OK', data: user };
  }

  @Get('/get_locale')
  async getHello(@Query('username') username = 'test') {
    return this.midwayI18nService.translate('hello', {
      args: {
        username,
      },
    });
  }
}
