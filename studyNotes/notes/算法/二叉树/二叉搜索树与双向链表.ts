// # 题目
// 输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的双向链表。要求不能创建任何新的结点，只能调整树中结点指针的指向。

// # 思路
// 二叉搜索树的中序遍历即排序后的序列
// 1.递归左子树，找到左子树的最后一个节点，根节点左侧连接到左子树的最后一个节点
// 2.当前节点变为已经转换完成的链表的最后一个节点
// 3.递归右子树，找到当前树的最后一个节点
// 4.回溯到上一层，进行链接...

function convert(root) {
	if (!root) return null;
	let node = convertToLink(root, null);
	while (node.left) {
		node = node.left;
	}
	return node;
}

function convertToLink(node, parent) {
	node.left && convertToLink(node.left, node);
	node.right = parent;
	parent.left = node;
	node.right && convertToLink(node.right, node);
	return node;
}
