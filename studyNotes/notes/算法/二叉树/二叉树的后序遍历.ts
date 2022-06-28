// #题二叉树的后续遍历
// 输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历的结果。
// 如果是则输出Yes,否则输出No。假设输入的数组的任意两个数字都互不相同。

function VerifySquenceOfBST(arr: number[]) {
	if (arr.length == 0 || arr == null) {
		return false;
	}
	const len = arr.length;
	let root = arr[len - 1];
	let i = 0,
		j = 0;
	for (; i < len - 1; i++) {
		const val = arr[i];
		if (val > root) {
			break;
		}
	}
	for (j = i; j < len - 1; j++) {
		const val = arr[j];
		if (val < root) {
			return false;
		}
	}
	let left = true,
		right = true;
	if (i > 0) {
		left = VerifySquenceOfBST(arr.slice(0, i));
	}
	if (i < len - 1) {
		right = VerifySquenceOfBST(arr.slice(i, len - 1));
	}

	return left && right;
}
