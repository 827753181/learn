# this.setState

## setState 的流程

this.setState 会调用 this.updater.enqueueSetState 方法
this.updater.enqueueSetState 内部就是 更新流程里 创建 update 到调度 update 的过程了

```
  enqueueSetState(inst, payload, callback) {
    // 通过组件实例获取对应fiber
    const fiber = getInstance(inst);
    const eventTime = requestEventTime();
    const suspenseConfig = requestCurrentSuspenseConfig();

    // 获取优先级
    const lane = requestUpdateLane(fiber, suspenseConfig);
    // 创建update
    const update = createUpdate(eventTime, lane, suspenseConfig);

    update.payload = payload;

    // 赋值回调函数
    if (callback !== undefined && callback !== null) {
      update.callback = callback;
    }

    // 将update插入updateQueue
    enqueueUpdate(fiber, update);
    // 调度update
    scheduleUpdateOnFiber(fiber, lane, eventTime);
  }
```

```
  enqueueForceUpdate 和 enqueueSetState 只有以下两个区别
    update.tag = ForceUpdate;
    没有 paylod

  enqueueForceUpdate(inst, callback) {
      const fiber = getInstance(inst);
      const eventTime = requestEventTime();
      const suspenseConfig = requestCurrentSuspenseConfig();
      const lane = requestUpdateLane(fiber, suspenseConfig);

      const update = createUpdate(eventTime, lane, suspenseConfig);

      // 赋值tag为ForceUpdate
      update.tag = ForceUpdate;

      if (callback !== undefined && callback !== null) {
        update.callback = callback;
      }

      enqueueUpdate(fiber, update);
      scheduleUpdateOnFiber(fiber, lane, eventTime);
  };
```

## enqueueForceUpdate 和 enqueueSetState 的区别

update.tag = ForceUpdate 的作用是在 ClassComponent 中 当某次更新含有 tag 为 ForceUpdate 的 Update，那么当前 ClassComponent 不会受其他性能优化手段（shouldComponentUpdate|PureComponent）影响，一定会更新.

## 为什么 update 的 tag 为 ForceUpdate，就一定会更新

```
  shouldUpdate
  const shouldUpdate =
    // checkHasForceUpdateAfterProcessing内部会判断update是否存在tag是ForceUpdate，如果是，返回true
    checkHasForceUpdateAfterProcessing() ||
    // checkShouldComponentUpdate内部调用shouldComponentUpdate，以及当 该classComponent为PureComponent时浅比较state和props。
    checkShouldComponentUpdate(
      workInProgress,
      ctor,
      oldProps,
      newProps,
      oldState,
      newState,
      nextContext,
    );
```
