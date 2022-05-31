import { IPipelineContext, IValveHandler } from '@midwayjs/core';
import { Provide } from '@midwayjs/decorator';

@Provide()
export class StageOne implements IValveHandler {
  alias = 'stageOneName';
  async invoke(ctx: IPipelineContext): Promise<any> {
    ctx.set('stageOneCache', 'stageOneCacheValue');
    console.log('stageOne ctx', ctx);
    return {
      keys: ctx.keys(),
      name: [ctx.get('stageOneCache')],
    };
  }
}

@Provide()
export class StageTwo implements IValveHandler {
  alias = 'stageOneName';
  async invoke(ctx: IPipelineContext): Promise<any> {
    console.log('stageTwo ctx', ctx);

    ctx.set('stageTwoCache', 'stageTwoCacheValue');
    return {
      keys: ctx.keys(),
      name: [ctx.get('stageOneCache'), ctx.get('stageTwoCache')],
    };
  }
}
