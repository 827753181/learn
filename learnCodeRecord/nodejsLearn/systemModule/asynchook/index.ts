import asyncHooks from "async_hooks";
import fs from "fs";
const getCurAsyncId = () => asyncHooks.executionAsyncId();
const getTriggerAsyncId = () => asyncHooks.triggerAsyncId();
// 每个异步资源都会生产asyncId，asyncId全局递增且唯一
console.log(
  `
    global 当前上下文异步资源的asyncId ${getCurAsyncId()}
    global 触发当前上下文异步资源的异步资源的asyncId  ${getTriggerAsyncId()}
  `
);
fs.open("./test.txt", "r", (err, result) => {
  console.log(`
      fs.open 当前上下文异步资源的asyncId ${getCurAsyncId()}
      fs.open 触发当前上下文异步资源的异步资源的asyncId  ${getTriggerAsyncId()}
  `);
});

// 默认未分配promise的asyncId，因为 V8 提供的 promise introspection API 比较消耗性能
Promise.resolve().then(() => {
  // 第一次触发的asyncId会是第一次Promise.resolve().then里的回调
  // Promise asyncId: 0. Promise triggerAsyncId: 0
  console.log(
    `Promise asyncId: ${getCurAsyncId()}. Promise triggerAsyncId: ${getTriggerAsyncId()}`
  );
});
// 必须要通过asyncHooks.createHook创建一个hook启用 Promise 异步跟踪
const hooks = asyncHooks.createHook({
  init: (
    asyncId: number,
    type: string,
    triggerAsyncId: number,
    resource: object
  ) => {
    // 注意 init 回调里写日志造成 “栈溢出” 问题
    // 一个异步资源的生命周期中第一个阶段 init 回调是当构造一个可能发出异步事件的类时会调用，要注意由于使用 console.log() 输出日志到控制台是一个异步操作，在 AsyncHooks 回调函数中使用类似的异步操作将会再次触发 init 回调函数，进而导致无限递归出现 RangeError: Maximum call stack size exceeded 错误，也就是 “ 栈溢出”。
    // 调试时，一个简单的记录日志的方式是使用 fs.writeFileSync() 以同步的方式写入日志，这将不会触发 AsyncHooks 的 init 回调函数。
    // bad
    // console.log("init", asyncId, type, triggerAsyncId, resource);

    // good
    fs.writeFileSync(
      "./logout.txt",
      `init \n ${asyncId} \n ${type} \n ${triggerAsyncId} \n ${resource} \n`,
      {
        flag: "a+",
      }
    );
  },
  // before: (asyncId: number) => {
  //   console.log("before", asyncId);
  // },
  // after: (asyncId: number) => {
  //   console.log("after", asyncId);
  // },
  // destroy: (asyncId: number) => {
  //   console.log("destroy", asyncId);
  // },
  promiseResolve: (asyncId: number) => {
    // 第一次触发的asyncId会是第一次Promise.resolve().then里的回调
    console.log("promiseResolve", asyncId);
  },
});
hooks.enable();
Promise.resolve().then(() => {
  // Promise asyncId: 7. Promise triggerAsyncId: 6
  console.log(
    `after hooks enable Promise asyncId: ${getCurAsyncId()}. Promise triggerAsyncId: ${getTriggerAsyncId()}`
  );
  return {};
});
