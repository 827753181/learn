Diff算法的整体逻辑会经历两轮遍历：
第一轮遍历：处理更新的节点。
第二轮遍历：处理剩下的不属于更新的节点。

# 第一轮遍历
第一轮遍历步骤如下：
1. let i = 0，遍历newChildren，将newChildreni]与oldFiber比较，判断DOM节点是否可复用。
2. 如果可复用，i++，继续比较newChildren[i]与oldFiber.sibling，可以复用则继续遍历。
3. 如果不可复用，立即跳出整个遍历，第一轮遍历结束。
如果newChildren遍历完（即i === newChildren.length - 1）或者oldFiber遍历完（即oldFiber.sibling === null），跳出遍历，第一轮遍历结束。

当遍历结束后，会有两种结果：
## 步骤3跳出的遍历
此时newChildren没有遍历完，oldFiber也没有遍历完。
## 步骤4跳出的遍历
可能newChildren遍历完，或oldFiber遍历完，或他们同时遍历完。



# 第二轮遍历
对于第一轮遍历的结果，我们分别讨论：

## newChildren与oldFiber同时遍历完
那就是最理想的情况：只有组件更新。此时Diff结束。

## newChildren没遍历完，oldFiber遍历完
已有的DOM节点都复用了，这时还有新加入的节点，意味着本次更新有新节点插入，我们只需要遍历剩下的newChildren为生成的workInProgress fiber依次标记Placement。

你可以在这里看到这段源码逻辑

## newChildren遍历完，oldFiber没遍历完
意味着本次更新比之前的节点数量少，有节点被删除了。所以需要遍历剩下的oldFiber，依次标记Deletion。

你可以在这里看到这段源码逻辑

## newChildren与oldFiber都没遍历完
这意味着有节点在这次更新中改变了位置。

这是Diff算法最精髓也是最难懂的部分。我们接下来会重点讲解。