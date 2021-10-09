# layout （执行 DOM 操作，即 Dom 渲染后）

```
遍历 effectList
    |
    v
调用 commitLayoutEffects
    |
    v
commitLayoutEffectOnFiber （调用生命周期钩子和 hook）、commitAttachRef（赋值 ref）
```

![reactLayout__2021-09-27-16-35-40](/studyNotes/attachments/reactLayout__2021-09-27-16-35-40.png)

## commitLayoutEffectOnFiber

根据 fiber.tag 的不同会进行不同处理

- 对于 classComponent 会通过 current === null 判断是 mount 还是 update，去调用 componentDidMount 还是 componentDidUpdate
- 对于 functionComponent 会调用 useLayoutEffect 的回调函数  
  （调用，不是调度吼，是同步的，这就是 useLayoutEffect 和 useEffect 的区别，结合 reactMutation 可以看出来 useLayoutEffect 的销毁和回调是同步调用的）
- 对于 HostRoot，如果赋值了第三个回调参数，也会在这里调用

## commitAttachRef

代码逻辑很简单，获取实例，更新 ref

![reactLayout__2021-09-27-16-52-48](/studyNotes/attachments/reactLayout__2021-09-27-16-52-48.png)

# 题外话 current fiber 树的切换时机

在 mutation 阶段结束后，layout 阶段开始前。  
也就是说，当 componentWillUnmount 时，fiber 树还没切换，当 componentDidMount 和 didUpdate 时，也就是 layout 时，fiber 树已经切换  
![reactLayout__2021-09-27-16-40-44](/studyNotes/attachments/reactLayout__2021-09-27-16-40-44.png)
