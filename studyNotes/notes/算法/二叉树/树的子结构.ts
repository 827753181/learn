// # 题目
// 输入两棵二叉树A，B，判断B是不是A的子结构。（ps：我们约定空树不是任意一个树的子结构）

// # 思路
// 首先找到A树中和B树根节点相同的节点
// 从此节点开始，递归AB树比较是否有不同节点
function compare(root1, root2) {
	if (!root2) return true;
	if (!root1) return false;
	if (root1.val !== root2.val) return false;
	return compare(root1.left, root2.left) && compare(root1.right, root2.right);
}
function hasSubTree(root1, root2) {
	if (root1 && root2) {
		if (root1.val === root2.val) return compare(root1, root2);
		return hasSubTree(root1.left, root2) && hasSubTree(root1.right, root2);
	}
	return false;
}
