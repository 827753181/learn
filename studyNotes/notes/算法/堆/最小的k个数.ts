// # 题目
// 输入n个整数，找出其中最小的K个数。例如输入4,5,1,6,2,7,3,8这8个数字，则最小的4个数字是1,2,3,4。

// # 思路
// 思路1:
// 先排序，再取前k个数，最小时间复杂度nlogn。
// 思路2:
// 1.把前k个数构建一个大顶堆
// 2.从第k个数开始，和大顶堆的最大值进行比较，若比最大值小，交换两个数的位置，重新构建大顶堆
// 3.一次遍历之后大顶堆里的数就是整个数据里最小的k个数。
// 时间复杂度nlogk，优于思路1。
function GetLeastNumbers_Solution(arr, k) {
	arr.sort((a, b) => a - b);
	return arr.slice(0, k);
}

function GetLeastNumbers_Solution_Heap(arr, k) {
	if (k > arr.length) {
		return [];
	}
	/* const maxHead = new Heap("max", arr);
	for (let i = k; i < arr.length; i++) {
		if (maxHead.value[0] > arr[i]) {
			[maxHead.value[0], arr[i]] = [arr[i], maxHead.value[0]];
			maxHead.adjust(0, k);
		}
	}
	return maxHead.value.slice(0, k); */

	createMaxHeap(arr, k);
	for (let i = k; i < arr.length; i++) {
		// 当前值比最小的k个值中的最大值小
		if (arr[i] < arr[0]) {
			[arr[i], arr[0]] = [arr[0], arr[i]];
			adjustMaxHeap(arr, 0, k);
		}
	}
	return arr.slice(0, k);
}
function adjustMaxHeap(arr, index, len) {
	for (let i = index * 2 + 1; i < len; i = i * 2 + 1) {
		if (i + 1 < len && arr[i + 1] > arr[i]) {
			i++;
		}

		if (arr[index] < arr[i]) {
			[arr[index], arr[i]] = [arr[i], arr[index]];
			index = i;
		} else {
			break;
		}
	}
}

function createMaxHeap(arr, len) {
	for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
		adjustMaxHeap(arr, i, len);
	}
}
