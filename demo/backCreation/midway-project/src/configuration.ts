import { Configuration, App, Inject, Logger, Init } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { DefaultErrorFilter } from './filter/default.filter';
import { NotFoundFilter } from './filter/notfound.filter';
import * as orm from '@midwayjs/orm';
import {
  ILifeCycle,
  ILogger,
  IMidwayContainer,
  MidwayApplicationManager,
  MidwayDecoratorService,
} from '@midwayjs/core';
import * as DefaultConfig from './config/config.default';
import * as LocalConfig from './config/config.local';
import * as testComponent from './components/testComponent/src';
import * as axios from '@midwayjs/axios';
import * as lodash from 'lodash';
import * as i18n from '@midwayjs/i18n';

import { MemoryStore } from './service/memoryStore.service';
import { MEMERY_CACHE_KEY } from './decorator/propertyDecorator/memery.decorator';
import { LOGGING_TIME_KEY } from './decorator/methodDecorator/loggingTime.decorator';
import { USER_KEY } from './decorator/paramDecorator/user.decorator';
import {
  CustomHttpErrorCodeEnum,
  HttpCustomError,
} from './error/httpCustomError';

@Configuration({
  imports: [
    koa,
    validate,
    testComponent,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    orm,
    axios,
    i18n,
  ],
  importConfigs: [
    {
      default: DefaultConfig,
      local: LocalConfig,
    },
  ],
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: koa.Application;

  @Inject()
  applicationManager: MidwayApplicationManager;

  // 应用级别的日志
  @Logger()
  logger: ILogger;

  @Inject()
  memoryStore: MemoryStore;

  // core Logger
  // @Logger('coreLogger')
  // logger: ILogger;
  @Inject()
  midwayDecoratorService: MidwayDecoratorService;

  @Init()
  async init() {
    // 注册属性装饰器
    this.midwayDecoratorService.registerPropertyHandler(
      MEMERY_CACHE_KEY,
      (name, metadata) => this.memoryStore.fetch(metadata.key)
    );
    this.memoryStore.save('aaa', 111);

    function formatDuring(value, formatUnit: string) {
      // 这里返回时间格式化
      if (formatUnit === 'ms') {
        return `${value} ms`;
      } else if (formatUnit === 'min') {
        // return xxx
      }
    }
    // 注册方法装饰器
    this.midwayDecoratorService.registerMethodHandler(
      LOGGING_TIME_KEY,
      ({ metadata }) => {
        return {
          around: async joinPoint => {
            const startTime = Date.now();
            const result = await joinPoint.proceed(...joinPoint.args);
            const during = formatDuring(
              Date.now() - startTime,
              metadata.formatUnit || 'ms'
            );
            this.logger.info(
              `Method ${joinPoint.methodName} invoke during ${during}`
            );
            return result;
          },
        };
      }
    );
    // 注册参数装饰器
    this.midwayDecoratorService.registerParameterHandler(USER_KEY, options => {
      console.log(options, 'userParamterDecorator options');
      return options.originArgs[0]?.user ?? {};
    });
  }

  async onReady(container: IMidwayContainer) {
    container.registerObject('lodash', lodash);
    /*   if (container.hasNamespace('axios')) {
      console.log(1);
    }
    console.log(
      this.applicationManager.getApplications(['koa', 'orm', 'validate'])
    ); */
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);
    // add filter
    this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
    // this.app.getMiddleware().getNames();
    // this.app.getMiddleware().insertFirst(ReportMiddleware);
    // this.app.getMiddleware().insertLast(ReportMiddleware);
    // this.app.getMiddleware().insertAfter(ReportMiddleware, 'report');
    // this.app.getMiddleware().insertBefore(ReportMiddleware, 'report');

    // this.logger.info('xx');
    // this.logger.debug('xx');
    // this.logger.warn('xx');
    // this.logger.error(new Error('xx'));

    // axios config
    const httpService = await container.getAsync(axios.HttpService);
    httpService.interceptors.request.use(
      config => {
        // Do something before request is sent
        return config;
      },
      error => {
        // Do something with request error
        throw new HttpCustomError(
          error.message,
          CustomHttpErrorCodeEnum.COMMON
        );

        // return Promise.reject(error);
      }
    );

    /* const mods = listModule(MODEL_KEY);
    for (const mod of mods) {
      console.log(
        getClassMetadata(MODEL_KEY, mod),
        await container.getAsync(mod)
      );
    } */
  }
}
