/*
 * @lc app=leetcode.cn id=34 lang=typescript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 *
 * https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/description/
 *
 * algorithms
 * Medium (42.28%)
 * Likes:    1808
 * Dislikes: 0
 * Total Accepted:    590.3K
 * Total Submissions: 1.4M
 * Testcase Example:  '[5,7,7,8,8,10]\n8'
 *
 * 给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。
 *
 * 如果数组中不存在目标值 target，返回 [-1, -1]。
 *
 * 你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [5,7,7,8,8,10], target = 8
 * 输出：[3,4]
 *
 * 示例 2：
 *
 *
 * 输入：nums = [5,7,7,8,8,10], target = 6
 * 输出：[-1,-1]
 *
 * 示例 3：
 *
 *
 * 输入：nums = [], target = 0
 * 输出：[-1,-1]
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= nums.length <= 10^5
 * -10^9 <= nums[i] <= 10^9
 * nums 是一个非递减数组
 * -10^9 <= target <= 10^9
 *
 *
 */

// @lc code=start
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

function searchRange(nums: number[], target: number): number[] {
	if (nums == null || nums.length === 0 || target == null || isNaN(target)) {
		return [-1,-1];
	}
	let len = nums.length;
	let start = binarySearchStart(nums, target, 0, len);
	let end = binarySearchEnd(nums, target, 0, len);
	if (start >= 0 && end >= 0) return [start, end];
	else return [-1,-1];
}
// @lc code=end
