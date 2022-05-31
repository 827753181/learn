// import { Framework } from '@midwayjs/decorator';
// import {
//   BaseFramework,
//   IConfigurationOptions,
//   IMidwayApplication,
//   IMidwayContext,
// } from '@midwayjs/core';
// import * as http from 'http';

// // 定义 Context
// // eslint-disable-next-line @typescript-eslint/no-empty-interface
// export interface Context extends IMidwayContext {
//   // ...
// }

// // 定义 Application
// // eslint-disable-next-line @typescript-eslint/no-empty-interface
// export interface Application extends IMidwayApplication<Context> {
//   // ...
//   serve: http.Server;
// }

// // 框架的配置
// export interface IMidwayCustomConfigurationOptions
//   extends IConfigurationOptions {
//   port: number;
//   // ...
// }

// // 实现一个自定义框架，继承基础框架
// @Framework()
// export class MidwayCustomFramework extends BaseFramework<
//   Application,
//   Context,
//   IMidwayCustomConfigurationOptions
// > {
//   // 处理初始化配置
//   configure() {
//     return this.configService.getConfiguration('customKey');
//     // ...
//   }
//   // app 初始化
//   async applicationInitialize() {
//     // 创建一个 app 实例
//     this.app.serve = http.createServer((req, res) => {
//       // 创建请求上下文，自带了 logger，请求作用域等
//       //   const ctx = this.app.createAnonymousContext();
//       // 从请求上下文拿到注入的服务
//       /* ctx.requestContext
//         .getAsync('xxxx')
//         .then(ins => {
//           // 调用服务
//           return ins.xxx();
//         })
//         .then(() => {
//           // 请求结束
//           res.end();
//         }); */
//     });

//     // 给 app 绑定上 midway 框架需要的一些方法，比如 getConfig, getLogger 等。
//     this.defineApplicationProperties();
//   }

//   // 框架启动，比如 listen
//   async run() {
//     // 启动的参数，这里只定义了启动的 HTTP 端口
//     if (this.configurationOptions.port) {
//       new Promise<void>(resolve => {
//         this.app.serve.listen(this.configurationOptions.port, () => {
//           resolve();
//         });
//       });
//     }
//   }

//   // 框架类型
//   async getFrameworkType() {
//     // ...
//   }
// }
