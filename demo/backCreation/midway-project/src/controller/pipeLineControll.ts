import { IPipelineHandler } from '@midwayjs/core';
import { Controller, Get, Inject, Pipeline } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { StageOne, StageTwo } from '../service/pipeLineValueHandler/waterfall';

// interface IPipelineHandler {
//   /**
//    * 并行执行，使用 Promise.all
//    * @param opts 执行参数
//    */
//   parallel<T>(opts: IPipelineOptions): Promise<IPipelineResult<T>>;
//   /**
//    * 并行执行，最终 result 为数组
//    * @param opts 执行参数
//    */
//   concat<T>(opts: IPipelineOptions): Promise<IPipelineResult<T>>;
//   /**
//    * 串行执行，使用 foreach await
//    * @param opts 执行参数
//    */
//   series<T>(opts: IPipelineOptions): Promise<IPipelineResult<T>>;
//   /**
//    * 串行执行，使用 foreach await，最终 result 为数组
//    * @param opts 执行参数
//    */
//   concatSeries<T>(opts: IPipelineOptions): Promise<IPipelineResult<T>>;
//   /**
//    * 串行执行，但是会把前者执行结果当成入参，传入到下一个执行中去，最后一个执行的 valve 结果会被返回
//    * @param opts 执行参数
//    */
//   waterfall<T>(opts: IPipelineOptions): Promise<IPipelineResult<T>>;
// }
@Controller('/pipeLine')
export class HomeController {
  @Inject()
  ctx: Context;

  @Pipeline([StageOne, StageTwo])
  stages: IPipelineHandler;

  // @Inject()
  // serviceFactory: HttpServiceFactory;

  @Get('/watefall')
  async home(): Promise<any> {
    // 动态创建
    // 会合并 传入config 和 config.default
    // const customHttpClient = await this.serviceFactory.createInstance(
    //   {
    //     baseUrl: 'xxxxx',
    //   },
    //   'custom'
    // );
    // customHttpClient = this.serviceFactory.get('custom');

    // console.log(this.serviceFactory.get('aaa'));
    return await this.stages.waterfall<any>({ args: { aa: 123 } });
  }
}
