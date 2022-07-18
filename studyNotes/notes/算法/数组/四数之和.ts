// 题目
// 给定一个包含 n 个整数的数组nums，判断 nums 中是否存在四个元素a，b，c，d ，使得 a + b + c + d = 0 ？找出所有满足条件且不重复的四元组。
// 注意：答案中不可以包含重复的四元组。
// 给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。
// 满足要求的四元组集合为：
// [
//   [-1,  0, 0, 1],
//   [-2, -1, 1, 2],
//   [-2,  0, 0, 2]
// ]

// #思路
// 你已经经历了两数之和、三数之和，玩玩没想到，还有四数之和...
// 其实，后面还有五数之和，六数之和...
// 到这里其实我们就能发现一些规律，我们可以像三数之和 (opens new window)那样，我们可以通过大小指针来逼近结果，从而达到降低一层时间复杂度的效果。
// 不管是几数之和，我们都用这种方法来进行优化。
// 都一样，排序后固定除两个数外的其他数，然后大小指针逼近找

var fourSum = function (nums, target) {
	// 鲁棒
	if (nums == null || nums.length < 0) return;
	// 排序
	nums.sort((a, b) => a - b);
	let len = nums.length;
	let arr = [];
	for (let i = 0; i < len - 3; i++) {
		if (i > 0 && nums[i] === nums[i - 1]) {
			continue;
		}
		if (nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) {
			break;
		}
		for (let j = i + 1; j < len - 2; j++) {
			if (j > 0 && nums[j] === nums[j - 1]) {
				continue;
			}
			if (nums[i] + nums[j] + nums[j + 1] + nums[j + 2] > target) {
				break;
			}
			let start = j + 1,
				end = len - 1;
			while (start < end) {
				const sum = nums[i] + nums[j] + nums[start] + nums[end];
				if (sum === target) {
					arr.push([nums[i], nums[j], nums[start], nums[end]]);
				}
				if (sum <= target) {
					// ++ start,且跳过重复元素调优
					while (nums[start] === nums[++start]) {}
				} else {
					// -- end,且跳过重复元素调优
					while (nums[end] === nums[--end]) {}
				}
			}
		}
	}
	return arr;
};
