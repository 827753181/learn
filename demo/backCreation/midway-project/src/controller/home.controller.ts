import { Controller, Get, Inject } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;

  @Get('/')
  async home(): Promise<string> {
    const userServices = await this.ctx.requestContext.getAsync(UserService);
    const user = await userServices.getUser({ uid: 1 });
    return JSON.parse(JSON.stringify(user));
  }
}
