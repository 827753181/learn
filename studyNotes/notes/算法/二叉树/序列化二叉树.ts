// # 题目
// 请实现两个函数，分别用来序列化和反序列化二叉树

// # 思路
// 若一颗二叉树是不完全的，我们至少需要两个遍历才能将它重建（像题目重建二叉树一样）
// 但是这种方式仍然有一定的局限性，比如二叉树中不能出现重复节点。
// 如果二叉树是一颗完全二叉树，我们只需要知道前序遍历即可将它重建。
// 因此在序列化时二叉树时，可以将空节点使用特殊符号存储起来，这样就可以模拟一棵完全二叉树的前序遍历
// 在重建二叉树时，当遇到特殊符号当空节点进行处理

// (相当于强行加个特殊符号，使序列化的二叉树必定是先序遍历的完全二叉树，只是有些字符表示空)
function Serialize(root,arr=[]) {
    if(!root)
        arr.push('#')
    else{
        arr.push(String(root.val))
        Serialize(root.left,arr)
        Serialize(root.right,arr)
    }
    return arr.join(',')
}
function deserialize(arr: (string | number)[]) {
	const current = arr.shift();
	let node = null;
	if (current !== "#") {
		node = {
			val: current,
		};
		node.left = deserialize(arr);
		node.right = deserialize(arr);
	}
	return node;
}
function Deserialize(arr) {
	return deserialize(arr);
}
