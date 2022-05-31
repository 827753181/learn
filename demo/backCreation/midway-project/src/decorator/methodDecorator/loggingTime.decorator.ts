import { REQUEST_OBJ_CTX_KEY } from '@midwayjs/core';
import { createCustomMethodDecorator } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';

export const LOGGING_TIME_KEY = 'decorator:logging_time';
export function LoggingTime(formatUnit = 'ms'): MethodDecorator {
  // 获取装饰器上下文对象
  /* return (
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    const method = descriptor.value;
    descriptor.value = function (...args) {
      // 指向当前上层框架的上下文对象，上层框架的上下文对象请参考各上层框架文档。
      console.log(
        this[REQUEST_OBJ_CTX_KEY] as Context,
        'logggingtime 方法装饰器上下文'
      );

      return method.apply(this, [...args]);
    };
    return descriptor;
  }; */
  // 最后一个参数如果是false，无需指定实现
  // return createCustomMethodDecorator(LOGGING_TIME_KEY, {formatUnit}, false);
  return createCustomMethodDecorator(LOGGING_TIME_KEY, { formatUnit });
}
