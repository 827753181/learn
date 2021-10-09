# mutation （执行 DOM 操作）

主要调用 commitMutationEffects 函数  
会遍历 effectList，依次执行 commitMutationEffects。该方法的主要工作为“根据 effectTag 调用不同的处理函数处理 Fiber。

# commitMutationEffects

```
  遍历effectList
        |
        v
  commitResetTextContent
  根据 ContentReset effectTag 重置文本节点
        |
        v
  commitDetachRef
  更新ref
        |
        v
  根据 effectTag 分别处理 插入，更新，ssr，删除dom操作
  effectTag包括(Placement | Update | Deletion | Hydrating)
```

## Placement Effect(commitPlacement 方法)

1. 获取父 DOM 节点
2. 获取 Fiber 节点的 DOM 兄弟节点
3. 根据是否有兄弟节点，决定当前插入节点是调用 insertBefore 还是 appendChild

![reactMutation__2021-09-27-15-07-21](/studyNotes/attachments/reactMutation__2021-09-27-15-07-21.png)

注意点： getHostSibling 获取兄弟 Dom 节点操作很费时，因为 fiber 树和 dom 树不是一一对应的，往往要跨层级遍历，详见下图

![reactMutation__2021-09-27-15-08-42](/studyNotes/attachments/reactMutation__2021-09-27-15-08-42.png)
图片截取自  
https://kasong.gitee.io/just-react/renderer/mutation.html#placement-effect

## Update Effect(commitWork 方法)

注：commitWork 里的 supportsMutation 表示是否执行 dom 操作

1. 读取 fiber.tag
2. 根据 fiber.tag 进行不同操作

### FunctionComponent

调用 commitHookEffectListUnmount 方法  
该方法遍历 effectList，执行所有 useLayoutEffect 方法的销毁函数

### HostComponent

调用 commitUpdate 方法  
然后 commitUpdate 调用 updateFiberProps 处理 dom 属性更新  
然后 updateProperties, updateProperties 调用 updateDOMProperties 处理 style、DANGEROUSLY_SET_INNER_HTML、children 这几个特殊属性 prop

![reactMutation__2021-09-27-15-46-57](/studyNotes/attachments/reactMutation__2021-09-27-15-46-57.png)

![reactMutation__2021-09-27-15-46-38](/studyNotes/attachments/reactMutation__2021-09-27-15-46-38.png)

## Deletion Effect(commitDeletion 方法)

注：commitDeletion 里的 supportsMutation 表示是否执行 dom 操作

递归调用 fiber 节点及子孙节点的 componentWillUnmount 生命周期钩子，并从页面移除对应 dom 节点

解绑 ref

调度 useeffect 的销毁函数

![reactMutation__2021-09-27-16-06-21](/studyNotes/attachments/reactMutation__2021-09-27-16-06-21.png)
