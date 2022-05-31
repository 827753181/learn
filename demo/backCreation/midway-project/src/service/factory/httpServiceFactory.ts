import { HttpClient, ServiceFactory } from '@midwayjs/core';
import { Config, Init, Provide, Scope, ScopeEnum } from '@midwayjs/decorator';

@Provide()
@Scope(ScopeEnum.Singleton)
export class HttpServiceFactory extends ServiceFactory<HttpClient> {
  getName(): string {
    return 'HttpServiceFactory';
  }

  @Config('httpClient')
  httpClientConfig;

  @Init()
  async init() {
    console.log(this.httpClientConfig);
    this.initClients(this.httpClientConfig);
  }

  protected createClient(
    config: any,
    clientName: any
  ): void | HttpClient | Promise<void | HttpClient> {
    return new HttpClient(config);
  }
}
