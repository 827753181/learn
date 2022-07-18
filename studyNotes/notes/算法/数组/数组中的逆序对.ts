// #题目
// 在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组,求出这个数组中的逆序对的总数P。

// #思路
// 使用暴力法：从第一个数开始，依次和后面每一个数字进行比较记录逆序对的个数，时间复杂度O(n2)
// 使用分治的细想：
// 若没了解过归并排序，建议先熟悉归并排序算法再来看本题。
// 直接将归并排序进行改进，把数据分成N个小数组。
// 合并数组 left - mid , mid+1 - right，合并时， 若array[leftIndex] > array[rightIndex] ,则比右边 rightIndex-mid个数大
// count += rightIndex-mid
// 注意和归并排序的区别： 归并排序是合并数组数从小数开始，而本题是从大数开始。
// 时间复杂度O(nlogn)
// 空间复杂度O(n)

function violencePairs(data) {
	let count = 0,
		len = data.length;
	for (let i = 0; i < len; i++) {
		const item = data[i];
		for (let j = i; j < len; j++) {
			const item2 = data[j];
			if (item > item2) {
				count++;
			}
		}
	}
	return count;
}

function InversePairs(data) {
	return mergeSort(data, 0, data.length - 1, []);
}

function mergeSort(array, left, right, temp) {
	if (left < right) {
		const mid = parseInt((left + right) / 2);
		const l = mergeSort(array, left, mid, temp);
		const r = mergeSort(array, mid + 1, right, temp);
		const m = merge(array, left, right, mid, temp);
		return l + m + r;
	} else {
		return 0;
	}
}

function merge(array, left, right, mid, temp) {
	let leftIndex = mid;
	let rightIndex = right;
	let tempIndex = right - left;
	let count = 0;
	while (leftIndex >= left && rightIndex > mid) {
		if (array[leftIndex] > array[rightIndex]) {
			count += rightIndex - mid;
			temp[tempIndex--] = array[leftIndex--];
		} else {
			temp[tempIndex--] = array[rightIndex--];
		}
	}

	while (leftIndex >= left) {
		temp[tempIndex--] = array[leftIndex--];
	}
	while (rightIndex > mid) {
		temp[tempIndex--] = array[rightIndex--];
	}
	tempIndex = 0;
	for (let i = left; i <= right; i++) {
		array[i] = temp[tempIndex++];
	}
	return count;
}
