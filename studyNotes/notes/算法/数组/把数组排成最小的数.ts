// #思路
// 定义一种新的排序规则，将整个数组重新排序：
// a和b两个数字可以有两种组合：ab和ba，若ab<ba则ab应该排在ba前面，否则ab应该排在ba后面。
// 使用数组的sort方法，底层是快排，也可以手写一个快排。
// sort方法接收一个比较函数，compareFunction：如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；
function PrintMinNumber(numbers: number[]) {
	if (numbers == null || numbers.length === 0) {
		return "";
	}

	return numbers
		.sort((a, b) => {
			const before = "" + a + b;
			const after = "" + b + a;
			if (before < after) {
				return -1;
			} else {
				return 1;
			}
		})
		.reduce((pre, cur) => pre + cur, "");
}
