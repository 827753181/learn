import { providerWrapper, getCurrentApplicationContext } from '@midwayjs/core';
import { ScopeEnum } from '@midwayjs/decorator';
import { SiteService } from './sites.service';
import { UserService } from './user.service';

export async function dynamicCacheServiceHandler() {
  // 获取主框架
  // getCurrentMainFramework();
  // 获取app
  // getCurrentMainApp();
  // 获取容器，从容器 API 获取全局配置
  const container = getCurrentApplicationContext();
  if (container.getAttr('env') === 'local') {
    return await container.getAsync(UserService);
  } else {
    return await container.getAsync(SiteService);
  }
}

providerWrapper([
  {
    id: 'dynamicCacheService',
    provider: dynamicCacheServiceHandler,
    scope: ScopeEnum.Request, // 设置为请求作用域，那么上面传入的容器就为请求作用域容器
    // scope: ScopeEnum.Singleton,  // 也可以设置为全局作用域，那么里面的调用的逻辑将被缓存
  },
]);
