// 输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
// 例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。

// 思路
// 前序遍历：根节点 + 左子树前序遍历 + 右子树前序遍历
// 中序遍历：左子树中序遍历 + 根节点 + 右字数中序遍历
// 后序遍历：左子树后序遍历 + 右子树后序遍历 + 根节点
// 根据上面的规律：

// 前序遍历找到根结点root
// 找到root在中序遍历的位置 -> 左子树的长度和右子树的长度
// 截取左子树的中序遍历、右子树的中序遍历
// 截取左子树的前序遍历、右子树的前序遍历
// 递归重建二叉树

function reConstructBinaryTree(preArr: number[], inOrderArr: number[]) {
	if (preArr.length == 0 || inOrderArr.length == 0) {
		return;
	}
	if (preArr.length == 1) {
		return new TreeNode(preArr[0]);
	}
	const root = preArr[0],
		inOrderRootIndex = inOrderArr.indexOf(root);
	// left Tree len
	const leftTreeLen = inOrderRootIndex - 1;
	// right Tree len
	const rightTreeLen = inOrderArr.length - inOrderRootIndex;

	const preLeftArr = preArr.slice(1, inOrderRootIndex),
		preRightArr = preArr.slice(inOrderRootIndex + 1),
		inOrderLeftArr = inOrderArr.slice(0, inOrderRootIndex),
		inOrderRightArr = inOrderArr.slice(inOrderRootIndex + 1);

	/* 
        // or
        const preLeftArr = preArr.slice(1, leftTreeLen + 1),
            preRightArr = preArr.slice(-rightTreeLen),
            inOrderLeftArr = inOrderArr.slice(0, leftTreeLen + 1),
            inOrderRightArr = inOrderArr.slice(-rightTreeLen);
    */
	const node = new TreeNode(root);

	node.left = reConstructBinaryTree(preLeftArr, inOrderLeftArr);
	node.right = reConstructBinaryTree(preRightArr, inOrderRightArr);
	return node;
}

// 给定一棵二叉树的前序遍历和中序遍历，求其后序遍历

// 输入描述:

// 两个字符串，其长度n均小于等于26。 第一行为前序遍历，第二行为中序遍历。 二叉树中的结点名称以大写字母表示：A，B，C....最多26个结点。

// 输出描述:

// 输入样例可能有多组，对于每组测试样例， 输出一行，为后序遍历的字符串。

// 样例：

// 输入
// ABC
// BAC
// FDXEAG
// XDEFAG

// 输出
// BCA
// XEDGAF

// 和上面题目的思路基本相同

// 前序遍历找到根结点root
// 找到root在中序遍历的位置 -> 左子树的长度和右子树的长度
// 截取左子树的中序遍历、右子树的中序遍历
// 截取左子树的前序遍历、右子树的前序遍历
// 递归拼接二叉树的后序遍历
function getHRD(preArr: number[], inOrderArr: number[]) {
	if (preArr.length == 0 || inOrderArr.length == 0) {
		return;
	}
	if (preArr.length == 1) {
		return preArr[0];
	}
	const root = preArr[0],
		inOrderRootIndex = inOrderArr.indexOf(root);

	const preLeftArr = preArr.slice(1, inOrderRootIndex),
		preRightArr = preArr.slice(inOrderRootIndex + 1),
		inOrderLeftArr = inOrderArr.slice(0, inOrderRootIndex),
		inOrderRightArr = inOrderArr.slice(inOrderRootIndex + 1);
	return (
		getHRD(preLeftArr, inOrderLeftArr) +
		getHRD(preRightArr, inOrderRightArr) +
		root
	);
}
