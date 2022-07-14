// 题目
// 数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。例如输入一个长度为9的数组{1,2,3,2,2,2,5,4,2}。
// 由于数字2在数组中出现了5次，超过数组长度的一半，因此输出2。如果不存在则输出0。

// #代码
// 解法1:
// 开辟一个额外空间存储每个值出现的次数，时间复杂度最大为O(n)，逻辑简单
/* function MoreThanHalfNum_Solution(numbers: number[]) {
	if (!Array.isArray(numbers)) return null;

	const mapObj = {};
	const len = numbers.length;
	for (let i = 0; i < numbers.length; i++) {
		const item = numbers[i];
		const showedTime = mapObj[item];
		if (showedTime + 1 > len / 2) {
			return item;
		}
		mapObj[item] = showedTime ? showedTime + 1 : 1;
	}
	return null;
}
 */
// #代码
// 解法2:
// 目标值的个数比其他所有值加起来的数多
// 记录两个变量 1.数组中的某个值 2.次数
// 遍历两次
// 第一次遍历
// 1.当前遍历值和上一次遍历值相等？次数+1 ： 次数-1。
// 2.次数变为0后保存新的值。（这样第一次遍历完就可以获取到数组中哪个值出现最多）
// 第二次遍历
// 1.根据第一次遍历结束后保存的值,遍历第二次取得其出现次数，判断其是否复合条件
// 事件复杂度O(n) 不需要开辟额外空间 , 逻辑稍微复杂。
function MoreThanHalfNum_Solution(numbers: number[]) {
	if (!Array.isArray(numbers)) return null;

	const len = numbers.length;
	let target = numbers[0];
	let showTime = 1;
	for (let i = 1; i < len; i++) {
		if (numbers[i] === target) {
			showTime++;
		} else {
			showTime--;
		}
		if (showTime === 0) {
			target = numbers[i];
			showTime = 1;
		}
	}
	showTime = 0;
	for (let i = 1; i < len; i++) {
		if (numbers[i] === target) {
			showTime++;
		}
	}

	return showTime > len / 2;
}
