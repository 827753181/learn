#
# @lc app=leetcode.cn id=46 lang=python3
#
# [46] 全排列
#
# https://leetcode-cn.com/problems/permutations/description/
#
# algorithms
# Medium (78.49%)
# Likes:    1880
# Dislikes: 0
# Total Accepted:    561K
# Total Submissions: 714.7K
# Testcase Example:  '[1,2,3]'
#
# 给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。
# 
# 
# 
# 示例 1：
# 
# 
# 输入：nums = [1,2,3]
# 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
# 
# 
# 示例 2：
# 
# 
# 输入：nums = [0,1]
# 输出：[[0,1],[1,0]]
# 
# 
# 示例 3：
# 
# 
# 输入：nums = [1]
# 输出：[[1]]
# 
# 
# 
# 
# 提示：
# 
# 
# 1 <= nums.length <= 6
# -10 <= nums[i] <= 10
# nums 中的所有整数 互不相同
# 
# 
#

# @lc code=start
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        pass
# @lc code=end



# class Solution:
#     def permute(self, nums):
#         """
#         :type nums: List[int]
#         :rtype: List[List[int]]
#         """
#         def backtrack(first = 0):
#             # 所有数都填完了
#             if first == n:  
#                 res.append(nums[:])
#             for i in range(first, n):
#                 # 动态维护数组
#                 nums[first], nums[i] = nums[i], nums[first]
#                 # 继续递归填下一个数
#                 backtrack(first + 1)
#                 # 撤销操作
#                 nums[first], nums[i] = nums[i], nums[first]
        
#         n = len(nums)
#         res = []
#         backtrack()
#         return res



# from typing import List


# class Solution:
#     def permute(self, nums: List[int]) -> List[List[int]]:
#         def dfs(nums, size, depth, path, state, res):
#             if depth == size:
#                 res.append(path)
#                 return

#             for i in range(size):
#                 if ((state >> i) & 1) == 0:
#                     dfs(nums, size, depth + 1, path + [nums[i]], state ^ (1 << i), res)

#         size = len(nums)
#         if size == 0:
#             return []

#         state = 0
#         res = []
#         dfs(nums, size, 0, [], state, res)
#         return res
