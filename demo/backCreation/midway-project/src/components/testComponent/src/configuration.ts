// src/configuration.ts
import { IMidwayContainer } from '@midwayjs/core';
import { App, Configuration } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as DefaultConfig from './config/config.default';

@Configuration({
  namespace: 'book',
  importConfigs: [DefaultConfig],
})
export class AutoConfiguration {
  @App()
  app: koa.Application;

  async onReady(container: IMidwayContainer) {
    // console.log(this.app.getConfig(), 12312321);
  }
}
