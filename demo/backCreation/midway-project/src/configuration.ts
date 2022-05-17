import { Configuration, App, Inject } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { DefaultErrorFilter } from './filter/default.filter';
import { NotFoundFilter } from './filter/notfound.filter';
import * as orm from '@midwayjs/orm';
import { IMidwayContainer, MidwayApplicationManager } from '@midwayjs/core';

import * as DefaultConfig from './config/config.default';
@Configuration({
  imports: [
    koa,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    orm,
  ],
  importConfigs: [
    {
      default: DefaultConfig,
    },
  ],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  @Inject()
  applicationManager: MidwayApplicationManager;

  async onReady(container: IMidwayContainer) {
    if (container.hasNamespace('axios')) {
      console.log(1);
    }
    console.log(
      this.applicationManager.getApplications(['koa', 'orm', 'validate'])
    );
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);
    // add filter
    this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
    // this.app.getMiddleware().getNames();
    // this.app.getMiddleware().insertFirst(ReportMiddleware);
    // this.app.getMiddleware().insertLast(ReportMiddleware);
    // this.app.getMiddleware().insertAfter(ReportMiddleware, 'report');
    // this.app.getMiddleware().insertBefore(ReportMiddleware, 'report');
  }
}
