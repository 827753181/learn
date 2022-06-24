// 题目
// 给定一棵二叉搜索树，请找出其中的第k小的结点。 例如， （5，3，7，2，4，6，8） 中，按结点数值大小顺序第三小结点的值为4。

// #思路
// 二叉搜索树的中序遍历即排序后的节点，本题实际考察二叉树的遍历。

function KthNode(root, k) {
	let current = root;
	let stack = [],
		res = [];
	while (current || stack.length > 0) {
		while (current) {
			stack.push(current);
			current = current.left;
		}
		current = stack.pop();
		res.push(current);
		current = current.right;
	}
	return res[k - 1];
}
