// # 基本结构
// 堆的底层实际上是一棵完全二叉树。
// 可以用数组实现
// 每个的节点元素值不小于其子节点 - 最大堆
// 每个的节点元素值不大于其子节点 - 最小堆

// # 堆的构建
// ## 大顶堆
// 从第一个非叶子节点开始依次对数组中的元素进行下沉操作
// 和孩子节点的最大值max比较
// 大于max — 不需要在下沉
// 小于max — 和max交换位置 - 继续和下一层孩子节点比较，直到队列末尾

function ajustMaxHeap(array, index, length) {
	for (let i = index * 2 + 1; i < length; i = i * 2 + 1) {
		// 取左右子节点中最大值
		if (i + 1 < length && array[i + 1] > array[i]) {
			i++;
		}
		// 和孩子节点的最大值max比较
		// 大于max — 不需要在下沉
		// 小于max — 和max交换位置 - 继续和下一层孩子节点比较，直到队列末尾
		if (array[index] > array[i]) {
			break;
		} else {
			[array[index], array[i]] = [array[i], array[index]];
			index = i;
		}
	}
}
function createMaxHeap(arr, length) {
	for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
		ajustMaxHeap(arr, i, length);
	}
	return arr;
}

// # 小顶堆
// 从第一个非叶子节点开始依次对数组中的元素进行下沉操作
// 和孩子节点的最小值min比较
// 小于min — 不需要在下沉
// 大于min — 和min交换位置（下沉） - 继续和下一层孩子节点比较，直到队列末尾
function ajustMinHeap(array, index, length) {
	for (let i = index * 2 + 1; i < length; i = i * 2 + 1) {
		// 取左右子节点中最小值
		if (i + 1 < length && array[i + 1] < array[i]) {
			i++;
		}
		// 和孩子节点的最小值min比较
		// 小于min — 不需要在下沉
		// 大于min — 和min交换位置 - 继续和下一层孩子节点比较，直到队列末尾
		if (array[index] < array[i]) {
			break;
		} else {
			[array[index], array[i]] = [array[i], array[index]];
			index = i;
		}
	}
}
function createMinHeap(arr, length) {
	for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
		ajustMinHeap(arr, i, length);
	}
	return arr;
}

// # 堆的插入
// 由于堆属于优先队列，只能从末尾添加
// 添加后有可能破坏堆的结构，需要从下到上进行调整
// 如果元素小于父元素，上浮
// 以小顶堆为例：
function minHeapAdd(array, element) {
	array.push(element);
	if (array.length > 1) {
		let idx = array.length - 1;
		let target = Math.floor((idx - 1) / 2);
		while (target >= 0) {
			if (array[idx] > array[target]) {
				break;
			} else {
				[array[idx], array[target]] = [array[target], array[idx]];
				idx = target;
				target = Math.floor((idx - 1) / 2);
			}
		}
	}
	return array;
}

// # 堆的移除
// 由于堆属于优先队列，只能从头部移除
// 移除头部后，使用末尾元素填充头部，开始头部下沉操作
// 以小顶堆为例：
function minHeapPop(array) {
	let result = null;
	if (array.length > 1) {
		result = array[0];
		array[0] = array.pop();
		ajustMinHeap(array, 0, array.length);
	} else if (array.length === 1) {
		return array.pop();
	}
	return result;
}

// # 封装
class Heap {
	type: "min" | "max";
	value: any[];
	constructor(type: "min" | "max" = "min", value: any[] = []) {
		this.type = type;
		this.value = value;
		this.create();
	}

	create() {
		const len = this.value.length;
		for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
			this.adjust(i, len);
		}
		return this.value;
	}
	adjust(index, len) {
		const array = this.value;
		const isMinHeap = this.type === "min";
		for (let i = index * 2 + 1; i < len; i = i * 2 + 1) {
			// 取左右子节点中最大/小值
			if (
				i + 1 < len &&
				(isMinHeap ? array[i + 1] < array[i] : array[i + 1] > array[i])
			) {
				i++;
			}
			// 和孩子节点的最大/小值比较
			if (isMinHeap ? array[index] < array[i] : array[index] > array[i]) {
				break;
			} else {
				[array[index], array[i]] = [array[i], array[index]];
				index = i;
			}
		}
	}
	add(val) {
		const array = this.value;
		const isMinHeap = this.type === "min";
		array.push(val);
		if (array.length > 1) {
			let idx = array.length - 1;
			let target = Math.floor((idx - 1) / 2);
			while (target >= 0) {
				if (
					isMinHeap
						? array[idx] > array[target]
						: array[idx] < array[target]
				) {
					break;
				} else {
					[array[idx], array[target]] = [array[target], array[idx]];
					idx = target;
					target = Math.floor((idx - 1) / 2);
				}
			}
		}
		return array;
	}
	pop() {
		let result = null;
		if (this.value.length > 1) {
			result = this.value[0];
			this.value[0] = this.value.pop();
			this.adjust(0, this.value.length);
		} else if (this.value.length === 1) {
			return this.value.pop();
		}
		return result;
	}
}
