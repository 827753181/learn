// #题目
// 统计一个数字在排序数组中出现的次数。

// #思路
// 本道题有好几种解法
// 1.直接遍历数组，判断前后的值是否相同，找到元素开始位置和结束位置，时间复杂度O(n)
// 2.使用二分查找找到目标值，在向前向后遍历，找到所有的数，比上面略优，时间复杂度也是O(n)
// 3.使用二分查找分别找到第一个目标值出现的位置和最后一个位置，时间复杂度O(logn)

function binarySearchStart(arr, data, start, end) {
	if (start > end) {
		return -1;
	}
	let mid = ((start + end) / 2) | 0;
	if (arr[mid] === data) {
		if (arr[mid - 1] !== arr[mid]) return mid;
		else return binarySearchStart(arr, data, start, mid - 1);
	} else if (arr[mid] < data) {
		return binarySearchStart(arr, data, mid + 1, end);
	} else {
		return binarySearchStart(arr, data, start, mid - 1);
	}
}

function binarySearchEnd(arr, data, start, end) {
	if (start > end) {
		return -1;
	}
	let mid = ((start + end) / 2) | 0;
	if (arr[mid] === data) {
		if (arr[mid + 1] !== arr[mid]) return mid;
		else return binarySearchEnd(arr, data, mid + 1, end);
	} else if (arr[mid] < data) {
		return binarySearchEnd(arr, data, mid + 1, end);
	} else {
		return binarySearchEnd(arr, data, start, mid - 1);
	}
}

function GetNumberOfK(arr, data) {
	if (arr == null || arr.length === 0 || data == null || isNaN(data)) {
		return 0;
	}
	let len = arr.length;
	let start = binarySearchStart(arr, data, 0, len);
	let end = binarySearchEnd(arr, data, 0, len);
	if (start >= 0 && end >= 0) return end - start + 1;
	else return 0;
}
