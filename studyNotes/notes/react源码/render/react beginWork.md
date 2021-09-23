# beginWork render阶段里类似于递归的递部分的操作，遍历根据react返回结果生成fiber节点
## update
props和fiber的type不变或当前节点优先级不够，直接复用之前结果
否则进入下一步reconcileChildren
## mount
直接进入下一步reconcileChildren 去新建子节点fiber


# 随后
进入reconcileChildren 
## update 
将当前组件和上次更新fiber对比，转diff算法解析.md
## mount
创建新的子fiber节点


# effectTag
当mount时，react会对effectTag的placement做优化
在beginWork时会走入mountChildFibers逻辑，创建dom并且链接dom关系，然后只会有rootFiber被放入Placement的effectTag，在commit阶段插入一次