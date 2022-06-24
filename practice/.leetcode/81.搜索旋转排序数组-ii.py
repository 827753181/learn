#
# @lc app=leetcode.cn id=81 lang=python3
#
# [81] 搜索旋转排序数组 II
#
# https://leetcode-cn.com/problems/search-in-rotated-sorted-array-ii/description/
#
# algorithms
# Medium (41.36%)
# Likes:    572
# Dislikes: 0
# Total Accepted:    150.3K
# Total Submissions: 363.2K
# Testcase Example:  '[2,5,6,0,0,1,2]\n0'
#
# 已知存在一个按非降序排列的整数数组 nums ，数组中的值不必互不相同。
# 
# 在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转 ，使数组变为 [nums[k],
# nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始
# 计数）。例如， [0,1,2,4,4,4,5,6,6,7] 在下标 5 处经旋转后可能变为 [4,5,6,6,7,0,1,2,4,4] 。
# 
# 给你 旋转后 的数组 nums 和一个整数 target ，请你编写一个函数来判断给定的目标值是否存在于数组中。如果 nums 中存在这个目标值
# target ，则返回 true ，否则返回 false 。
# 
# 你必须尽可能减少整个操作步骤。
# 
# 
# 
# 示例 1：
# 
# 
# 输入：nums = [2,5,6,0,0,1,2], target = 0
# 输出：true
# 
# 
# 示例 2：
# 
# 
# 输入：nums = [2,5,6,0,0,1,2], target = 3
# 输出：false
# 
# 
# 
# 提示：
# 
# 
# 1 <= nums.length <= 5000
# -10^4 <= nums[i] <= 10^4
# 题目数据保证 nums 在预先未知的某个下标上进行了旋转
# -10^4 <= target <= 10^4
# 
# 
# 
# 
# 进阶：
# 
# 
# 这是 搜索旋转排序数组 的延伸题目，本题中的 nums  可能包含重复元素。
# 这会影响到程序的时间复杂度吗？会有怎样的影响，为什么？
# 
# 
# 
# 
#

# @lc code=start
class Solution:
    def search(self, nums: List[int], target: int) -> bool:
        pass
# @lc code=end



# 对于数组中有重复元素的情况，二分查找时可能会有 a[l]=a[\textit{mid}]=a[r]a[l]=a[mid]=a[r]，此时无法判断区间 [l,\textit{mid}][l,mid] 和区间 [\textit{mid}+1,r][mid+1,r] 哪个是有序的。

# 例如 \textit{nums}=[3,1,2,3,3,3,3]nums=[3,1,2,3,3,3,3]，\textit{target}=2target=2，首次二分时无法判断区间 [0,3][0,3] 和区间 [4,6][4,6] 哪个是有序的。
# 对于这种情况，我们只能将当前二分区间的左边界加一，右边界减一，然后在新区间上继续二分查找。

# class Solution:
#     def search(self, nums: List[int], target: int) -> bool:
#         if not nums:
#             return False
        
#         n = len(nums)
#         if n == 1:
#             return nums[0] == target
         
#         l, r = 0, n - 1
#         while l <= r:
#             mid = (l + r) // 2
#             if nums[mid] == target:
#                 return True
#             if nums[l] == nums[mid] and nums[mid] == nums[r]:
#                 l += 1
#                 r -= 1
#             elif nums[l] <= nums[mid]:
#                 if nums[l] <= target and target < nums[mid]:
#                     r = mid - 1
#                 else:
#                     l = mid + 1
#             else:
#                 if nums[mid] < target and target <= nums[n - 1]:
#                     l = mid + 1
#                 else:
#                     r = mid - 1
        
#         return False
