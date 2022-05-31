import { Init, Inject, Provide } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';

@Provide()
// @Scope(ScopeEnum.Singleton)
export class ObjectLifecycleService {
  config: any;

  // @Init 装饰器标记的方法，一定会以异步方式来调用。一般来说，异步初始化的服务较慢，请尽可能标注为单例（@Scope(ScopeEnum.Singleton))。
  @Init()
  async init() {
    // console.log('this is init');

    return new Promise((res, rej) => {
      setTimeout(() => {
        // this.config = 123;
        res(this.config);
        // console.log('init finish');
      }, 100);
    });
  }
  @Inject()
  ctx: Context;
  /*  @Destroy()
  stop() {
    console.log('this is destoryed');
  } */

  getConfig() {
    // 这里获取的是 customLogger 对应的上下文日志对象
    const customLogger = this.ctx.getLogger('customLogger');
    customLogger.info('hello world');
    return this.config;
  }
}
