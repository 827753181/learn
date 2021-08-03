REACTDOM.render的流程
```
  创建rootFiberNode、rootFiber、updateQueue（`legacyCreateRootFromDOMContainer`）
      |
      v
  创建Update对象（`updateContainer`）
      |
      v
  从fiber到root（`markUpdateLaneFromFiberToRoot`）
      |
      v
  调度更新（`ensureRootIsScheduled`）
      |
      v
  render阶段（`performSyncWorkOnRoot` 或 `performConcurrentWorkOnRoot`）
      |
      v
  commit阶段（`commitRoot`）
```

buildOwnReact
  ```
  创建rootFiberNode
  scheduleIdleCallback  ===  调度更新 （`ensureRootIsScheduled`）
  performUnitOfWork
  reconcileChildren
  commitRoot
  ```