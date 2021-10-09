# before mutation 阶段（执行 DOM 操作前）
```
 遍历effectlist
      |
      v
 调用commitBeforeMutationEffects
```

## commitBeforeMutationEffects
1. 处理 dom 节点渲染/删除后的 autoFocus，blur 逻辑 --- beforeActiveInstanceBlur();
2. 调用 getSnapshotBeforeUpdate 之类的生命周期
3. 通过 flushPassiveEffects 调度 useEffect

## 如何异步调度

所以整个 useEffect 异步调用分为三步：

1. before mutation 阶段在 scheduleCallback 中调度 flushPassiveEffects

2. layout 阶段之后将 effectList 赋值给 rootWithPendingPassiveEffects

3. scheduleCallback 触发 flushPassiveEffects，flushPassiveEffects 内部触发 flushPassiveEffectsImpl，flushPassiveEffectsImpl 内部遍历 rootWithPendingPassiveEffects
