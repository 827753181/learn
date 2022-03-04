#
# @lc app=leetcode.cn id=15 lang=python3
#
# [15] 三数之和
#
# https://leetcode-cn.com/problems/3sum/description/
#
# algorithms
# Medium (34.63%)
# Likes:    4369
# Dislikes: 0
# Total Accepted:    820K
# Total Submissions: 2.4M
# Testcase Example:  '[-1,0,1,2,-1,-4]'
#
# 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0
# 且不重复的三元组。
#
# 注意：答案中不可以包含重复的三元组。
#
#
#
# 示例 1：
#
#
# 输入：nums = [-1,0,1,2,-1,-4]
# 输出：[[-1,-1,2],[-1,0,1]]
#
#
# 示例 2：
#
#
# 输入：nums = []
# 输出：[]
#
#
# 示例 3：
#
#
# 输入：nums = [0]
# 输出：[]
#
#
#
#
# 提示：
#
#
# 0
# -10^5
#
#
#

# @lc code=start
class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        # 双指针法
        n = len(nums)
        nums.sort()
        ans = list()

        for first in range(n):
            # 如果first的值和上一个数相同，就没什么意义去做下面的判断了
            if first > 0 and nums[first] == nums[first - 1]:
                continue
            second = first+1
            target = -nums[first]
            third = n-1
            while second < third:
                # 同first
                if second > first+1 and nums[second] == nums[second - 1]:
                    second += 1
                    continue
                if nums[second] + nums[third] < target:
                    second += 1
                elif nums[second] + nums[third] > target:
                    third -= 1
                else:
                    ans.append([-target, nums[second], nums[third]])
                    second += 1

    
        # first和second为止固定，去找third
        # n = len(nums)
        # nums.sort()
        # ans = list()

        # for first in range(n):
        #     # 如果first的值和上一个数相同，就没什么意义去做下面的判断了
        #     if first > 0 and nums[first] == nums[first - 1]:
        #         continue
        #     third = n-1
        #     target = -nums[first]
        #     for second in range(first+1, n):
        #         # 同first
        #         if second > first+1 and nums[second] == nums[second - 1]:
        #             continue
        #         while second < third and nums[second]+nums[third] > target:
        #             third -= 1
        #         if second == third:
        #             break
        #         elif nums[second] + nums[third] == target:
        #             ans.append([-target, nums[second], nums[third]])
        return ans
# @lc code=end


# class Solution:
#     def threeSum(self, nums: List[int]) -> List[List[int]]:
#         n = len(nums)
#         nums.sort()
#         ans = list()

#         # 枚举 a
#         for first in range(n):
#             # 需要和上一次枚举的数不相同
#             if first > 0 and nums[first] == nums[first - 1]:
#                 continue
#             # c 对应的指针初始指向数组的最右端
#             third = n - 1
#             target = -nums[first]
#             # 枚举 b
#             for second in range(first + 1, n):
#                 # 需要和上一次枚举的数不相同
#                 if second > first + 1 and nums[second] == nums[second - 1]:
#                     continue
#                 # 需要保证 b 的指针在 c 的指针的左侧
#                 while second < third and nums[second] + nums[third] > target:
#                     third -= 1
#                 # 如果指针重合，随着 b 后续的增加
#                 # 就不会有满足 a+b+c=0 并且 b<c 的 c 了，可以退出循环
#                 if second == third:
#                     break
#                 if nums[second] + nums[third] == target:
#                     ans.append([nums[first], nums[second], nums[third]])

#         return ans
