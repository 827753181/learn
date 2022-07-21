// # 题目
// 如何得到一个数据流中的中位数？如果从数据流中读出奇数个数值，那么中位数就是所有数值排序之后位于中间的数值。
// 如果从数据流中读出偶数个数值，那么中位数就是所有数值排序之后中间两个数的平均值。我们使用Insert()方法读取数据流
// 使用GetMedian()方法获取当前读取数据的中位数。

// # 思路
// 1.维护一个大顶堆，一个小顶堆，数据总数：
//     小顶堆里的值全大于大顶堆里的；
//     2个堆个数的差值小于等于1
// 2.当插入数字后数据总数为奇数时：使小顶堆个数比大顶堆多1；当插入数字后数据总数为偶数时，使大顶堆个数跟小顶堆个数一样。
// 3.当总数字个数为奇数时，中位数就是小顶堆堆头；当总数字个数为偶数时，中位数数就是2个堆堆顶平均数。
const maxHeap = new Heap("max");
const minHeap = new Heap("min");
function Insert(num) {
	const count = maxHeap.value.length + minHeap.value.length + 1;
	if (count % 2 === 1) {
		maxHeap.add(num);
		minHeap.add(maxHeap.pop());
	} else {
		minHeap.add(num);
		maxHeap.add(minHeap.pop());
	}
}
function GetMedian() {
	if (maxHeap.value.length + (minHeap.value.length % 2) === 1) {
		return minHeap.value[0];
	} else {
		return (maxHeap.value[0] + minHeap.value[0]) / 2;
	}
}
