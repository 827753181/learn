#
# @lc app=leetcode.cn id=16 lang=python3
#
# [16] 最接近的三数之和
#
# https://leetcode-cn.com/problems/3sum-closest/description/
#
# algorithms
# Medium (45.89%)
# Likes:    1060
# Dislikes: 0
# Total Accepted:    312.5K
# Total Submissions: 681.2K
# Testcase Example:  '[-1,2,1,-4]\n1'
#
# 给你一个长度为 n 的整数数组 nums 和 一个目标值 target。请你从 nums 中选出三个整数，使它们的和与 target 最接近。
#
# 返回这三个数的和。
#
# 假定每组输入只存在恰好一个解。
#
#
#
# 示例 1：
#
#
# 输入：nums = [-1,2,1,-4], target = 1
# 输出：2
# 解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。
#
#
# 示例 2：
#
#
# 输入：nums = [0,0,0], target = 1
# 输出：0
#
#
#
#
# 提示：
#
#
# 3 <= nums.length <= 1000
# -1000 <= nums[i] <= 1000
# -10^4 <= target <= 10^4
#
#
#

# @lc code=start
class Solution:
    def threeSumClosest(self, nums: List[int], target: int) -> int:
        pass
        # @lc code=end


# class Solution:
#     def threeSumClosest(self, nums: List[int], target: int) -> int:
#         nums.sort()
#         n = len(nums)
#         best = 10**7

#         # 根据差值的绝对值来更新答案
#         def update(cur):
#             nonlocal best
#             if abs(cur - target) < abs(best - target):
#                 best = cur

#         # 枚举 a
#         for i in range(n):
#             # 保证和上一次枚举的元素不相等
#             if i > 0 and nums[i] == nums[i - 1]:
#                 continue
#             # 使用双指针枚举 b 和 c
#             j, k = i + 1, n - 1
#             while j < k:
#                 s = nums[i] + nums[j] + nums[k]
#                 # 如果和为 target 直接返回答案
#                 if s == target:
#                     return target
#                 update(s)
#                 if s > target:
#                     # 如果和大于 target，移动 c 对应的指针
#                     k0 = k - 1
#                     # 移动到下一个不相等的元素
#                     while j < k0 and nums[k0] == nums[k]:
#                         k0 -= 1
#                     k = k0
#                 else:
#                     # 如果和小于 target，移动 b 对应的指针
#                     j0 = j + 1
#                     # 移动到下一个不相等的元素
#                     while j0 < k and nums[j0] == nums[j]:
#                         j0 += 1
#                     j = j0

#         return best
