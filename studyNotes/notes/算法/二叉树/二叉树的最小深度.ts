// # 题目

// 给定一个二叉树，找出其最小深度。

// 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

// 说明: 叶子节点是指没有子节点的节点。

// 示例：

// 给定二叉树 [3,9,20,null,null,15,7]，

//     3
//    / \
//   9  20
//     /  \
//    15   7

// 返回它的最小深度 2 。

// # 思路
// 深度优先遍历 + 分治
// 一棵二叉树的最小深度等于
// 左右子树都不为空：左子树深度和右子树最小深度的最小值 + 1
// 左树为空：右子树最小深度的最小值 + 1
// 右树为空：左子树最小深度 + 1

function minTreeDepth(pRoot) {
	if (!pRoot) return 0;
	else if (!pRoot.left) return minTreeDepth(pRoot.right) + 1;
	else if (!pRoot.right) return minTreeDepth(pRoot.left) + 1;
	else
		return (
			Math.min(minTreeDepth(pRoot.left), minTreeDepth(pRoot.right)) + 1
		);
}
