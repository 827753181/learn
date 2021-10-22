# react update 心智模型

## Update 的分类

ReactDOM.render —— HostRoot

this.setState —— ClassComponent

this.forceUpdate —— ClassComponent

useState —— FunctionComponent

useReducer —— FunctionComponent

一共三种组件触发更新，HostRoot，ClassComponent，FunctionComponent  
其中 HostRoot 和 ClassComponent 共用一种 Update，FunctionComponent 单独使用一种 Update

## UpdateQueue 的结构

updateQueue 有三种类型  
其中 HostComponent 的 updateQueue 为 updateHostComponent 处理后的 props  
ClassComponent 和 HostRoot 使用的 UpdateQueue 结构如下：

```
  const queue: UpdateQueue<State> = {
    baseState: fiber.memoizedState, // 本次更新前fiber的state，Update根据此属性计算新state
    // 本次更新前该Fiber节点已保存的Update。以链表形式存在
    // 链表头为firstBaseUpdate，链表尾为lastBaseUpdate。
    // 注：之所以在更新产生前该Fiber节点内就存在Update，是由于某些Update优先级较低所以在上次render阶段由Update计算state时被跳过。
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: {
      pending: null, // 触发更新时，产生的Update会保存在shared.pending中形成单向环状链表。当由Update计算state时这个环会被剪开并连接在lastBaseUpdate后面。
    },
    effects: null, // 数组。保存update.calback !== null的Update
  };
```

## Update 的结构

### HostRoot 和 ClassComponent 的结构

```
const update: Update<*> = {
  eventTime,// performance.now()获取的当前毫秒数，在未来会重构。
  lane,// 优先级
  suspenseConfig,// Suspense相关，暂不关注。
  tag: UpdateState,// 更新的类型，包含UpdateState｜replaceState｜ForceUpdate｜CaptureUpdate
  payload: null,// 更新挂载的数据。对于ClassComponent，payload为this.setState的第一个传参。对于HostRoot，payload为ReactDOM.render的第一个传参。
  callback: null,// 更新的回调函数

  next: null,// 与其他Update对象形成链表
};
```

### FunctionComponent 的结构

## Update 和 Fiber 的联系

Fiber 节点组成 Fiber 树，页面中最多同时存在两棵 Fiber 树：

- 代表当前页面状态的 current Fiber 树，其中的一个节点 current fiber 保存的 updateQueue 即 current updateQueue
- 代表正在 render 阶段的 workInProgress Fiber 树，其中一个节点 workInProgress fiber 保存的 updateQueue 即 workInProgress updateQueue

Update 会通过上面的 next 属性，形成一个链表，挂在在 Fiber 树上对应的 fiber 节点上的 fiber.updateQueue 中

> 那么什么情况会是多个 Update 对象形成链表挂载呢
>
> ```jsx
> onClick() {
>  this.setState({
>    a: 1
>  })
>  this.setState({
>    b: 2
>  })
> }
> ```
>
> 方法内部调用了两次 this.setState。这会在该 fiber 中产生两个 Update。


