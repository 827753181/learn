import { createCustomPropertyDecorator } from '@midwayjs/decorator';

export const MEMERY_CACHE_KEY = 'decorator:memery_cache_key';

// 定义一个属性装饰器，返回元数据
export function MemoryCache(key: string): PropertyDecorator {
  return createCustomPropertyDecorator(MEMERY_CACHE_KEY, {
    key,
  });
}
