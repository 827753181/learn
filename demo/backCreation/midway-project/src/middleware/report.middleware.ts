import { IMiddleware } from '@midwayjs/core';
import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';

@Middleware()
export class ReportMiddleware implements IMiddleware<Context, NextFunction> {
  /* @Inject()
  userService; //错误 这里注入的实例和上下文不绑定，无法获取到 ctx */

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      /*  const userService = await ctx.requestContext.getAsync<UserService>(
        UserService
      );
      const user = userService.getUser({ uid: 123123 }); */
      // TODO userService.xxxx
      // 控制器前执行的逻辑
      const startTime = Date.now();
      // 执行下一个 Web 中间件，最后执行到控制器
      // 这里可以拿到下一个中间件或者控制器的返回值
      const result = await next();
      // 控制器之后执行的逻辑
      console.log(ReportMiddleware.getName(), Date.now() - startTime);
      // 返回给上一个中间件的结果
      return result;
    };
  }
  // ignore(ctx?: Context): boolean {
  //   // content-type为html或者下面的路由将忽略此中间件
  //   return (
  //     ctx.header['content-type'] === 'text/html' ||
  //     ctx.path === '/' ||
  //     ctx.path === '/api/auth' ||
  //     ctx.path === '/api/login'
  //   );
  // }
  // match(ctx?: Context): boolean {
  //   // 下面的匹配到的路由会执行此中间件
  //   if (ctx.path === '/') {
  //     return true;
  //   }
  // }

  static getName(): string {
    return 'report';
  }
}
