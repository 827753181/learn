# diff 移动的节点

我们的参照物是：最后一个可复用的节点在 oldFiber 中的位置索引（用变量 lastPlacedIndex 表示）。

由于本次更新中节点是按 newChildren 的顺序排列。在遍历 newChildren 过程中，每个遍历到的可复用节点一定是当前遍历到的所有可复用节点中最靠右的那个，即一定在 lastPlacedIndex 对应的可复用的节点在本次更新中位置的后面。


我们用变量 oldIndex 表示遍历到的可复用节点在 oldFiber 中的位置索引。如果 oldIndex < lastPlacedIndex，代表本次更新该节点需要向右移动。

lastPlacedIndex 初始为 0，每遍历一个可复用的节点，如果 oldFiber >= lastPlacedIndex，则 lastPlacedIndex = oldFiber。

即
通过当前节点在旧列表 oldChildren 中的位置 oldIndex，oldIndex 和最后一个可复用的节点位置 lastPlacedIndex 的对比
获取相对位置是否改变。

```python
    if oldIndex >= lastPlacedIndex:
        lastPlacedIndex = oldIndex
    else:
        # oldIndex < lastPlacedIndex
        # oldIndex向右移动
        pass

```
