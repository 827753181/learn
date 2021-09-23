# completeWork render阶段里类似于递归的归部分的操作，遍历返回处理props，并将effectList链接起来
## 根据tag对props进行不同处理，以hostComponent为例
### update时
处理dom事件的回调，style Prop，children prop，DANGEROUSLY_SET_INNER_HTML prop等props
### mount时
为fiber节点生成dom节点，将子孙dom节点插入父级dom节点，调用finalizeInitialChildren和update一样处理props


执行完上面操作后，在completeWork的调用函数completeUnitOfWork中，会再将所有有effectTag的fiber及诶单追加在effectList中，形成以rootFiber.firstEffect为起点的单向链表。

（其实就是把父fiber节点的lastEffect.nextEffect = completedWork当前fiber及诶单）
```
                      nextEffect         nextEffect
rootFiber.firstEffect -----------> fiber -----------> fiber
```