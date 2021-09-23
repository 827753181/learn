``` jsx

// 处理useEffect相关
const rootDidHavePassiveEffects = rootDoesHavePassiveEffects;
if (rootDoesHavePassiveEffects) {
  rootDoesHavePassiveEffects = false;
  rootWithPendingPassiveEffects = root;
  pendingPassiveEffectsLanes = lanes;
  pendingPassiveEffectsRenderPriority = renderPriorityLevel;
} else {
  nextEffect = firstEffect;
  while (nextEffect !== null) {
    const nextNextEffect = nextEffect.nextEffect;
    nextEffect.nextEffect = null;
    if (nextEffect.effectTag & Deletion) {
      detachFiberAfterEffects(nextEffect);
    }
    nextEffect = nextNextEffect;
  }
}

remainingLanes = root.pendingLanes;

// 性能追踪相关
if (remainingLanes !== NoLanes) {
  if (enableSchedulerTracing) {
    if (spawnedWorkDuringRender !== null) {
      const expirationTimes = spawnedWorkDuringRender;
      spawnedWorkDuringRender = null;
      for (let i = 0; i < expirationTimes.length; i++) {
        scheduleInteractions(
          root,
          expirationTimes[i],
          root.memoizedInteractions,
        );
      }
    }
    schedulePendingInteractions(root, remainingLanes);
  }
} else {
  legacyErrorBoundariesThatAlreadyFailed = null;
}

// 性能追踪相关
if (enableSchedulerTracing) {
  if (!rootDidHavePassiveEffects) {
    finishPendingInteractions(root, lanes);
  }
}

// 检测无限循环渲染
if (remainingLanes === SyncLane) {
  if (root === rootWithNestedUpdates) {
    nestedUpdateCount++;
  } else {
    nestedUpdateCount = 0;
    rootWithNestedUpdates = root;
  }
} else {
  nestedUpdateCount = 0;
}

// 在离开commitRoot函数前调用，确保任何附加的任务被调度
ensureRootIsScheduled(root, now());

// 记录错误
if (hasUncaughtError) {
  hasUncaughtError = false;
  const error = firstUncaughtError;
  firstUncaughtError = null;
  throw error;
}

// 遗留的边界情况
if ((executionContext & LegacyUnbatchedContext) !== NoContext) {
  return null;
}

// 在layout阶段有同步任务被调度，在这里执行他们
flushSyncCallbackQueue();

return null;
```
主要有三点内容
useEffect相关的处理
性能追踪的相关处理
触发一些commit阶段的生命钩子（如果这些回调里会触发新的更新，会调度一个同步的新的render-commit流程，所以render和commit阶段不一定是线性的）