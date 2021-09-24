REACTDOM.render 的流程

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
   renderRootSync(`render阶段)
      |
      v
  commit阶段（`commitRoot`）
```

render 阶段

```
    renderRootSync
      |
      v
    workLoopSync
      |
      v
    performUnitOfWork
      |
      v
    beginWork
      |
      v
    completeUnitOfWork
```

commit 阶段

```
    commitRoot
      |
      v
    commitRootImpl
      |
      v
    TOFINISH
```

buildOwnReact

```
创建rootFiberNode
scheduleIdleCallback  ===  调度更新 （`ensureRootIsScheduled`）
performUnitOfWork
reconcileChildren
commitRoot
```
