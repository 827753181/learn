// #题二叉树的后续遍历
// 输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历的结果。
// 如果是则输出Yes,否则输出No。假设输入的数组的任意两个数字都互不相同。

function VerifySquenceOfBST(arr: number[]) {
	if (arr.length == 0 || arr == null) {
		return false;
	}
	let root = arr[arr.length - 1],
		leftTree = [],
		rightTree = [];
	let i = 0;
	for (; i < arr.length - 1; i++) {
		const val = arr[i];
		if (val < root) {
			leftTree.push(val);
		} else {
			break;
		}
	}
	for (; i < arr.length - 1; i++) {
		const val = arr[i];
		if (val > root) {
			rightTree.push(val);
		} else {
			return false;
		}
	}
	if (leftTree.length == 0 && rightTree.length == 0) return true;
	return VerifySquenceOfBST(leftTree) && VerifySquenceOfBST(rightTree);
}
