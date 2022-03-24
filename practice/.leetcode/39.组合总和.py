#
# @lc app=leetcode.cn id=39 lang=python3
#
# [39] 组合总和
#
# https://leetcode-cn.com/problems/combination-sum/description/
#
# algorithms
# Medium (72.78%)
# Likes:    1807
# Dislikes: 0
# Total Accepted:    433.4K
# Total Submissions: 595.5K
# Testcase Example:  '[2,3,6,7]\n7'
#
# 给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target
# 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。
#
# candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。 
#
# 对于给定的输入，保证和为 target 的不同组合数少于 150 个。
#
#
#
# 示例 1：
#
#
# 输入：candidates = [2,3,6,7], target = 7
# 输出：[[2,2,3],[7]]
# 解释：
# 2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
# 7 也是一个候选， 7 = 7 。
# 仅有这两种组合。
#
# 示例 2：
#
#
# 输入: candidates = [2,3,5], target = 8
# 输出: [[2,2,2,2],[2,3,3],[3,5]]
#
# 示例 3：
#
#
# 输入: candidates = [2], target = 1
# 输出: []
#
#
#
#
# 提示：
#
#
# 1 <= candidates.length <= 30
# 1 <= candidates[i] <= 200
# candidate 中的每个元素都 互不相同
# 1 <= target <= 500
#
#
#

# @lc code=start
class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        
        # res = []
        # if len(candidates) == 0:
        #     return []

        # def dfs(target, start, end, path, arr):
        #     if target == 0:
        #         res.append(path)
        #         return
        #     elif target < 0:
        #         return
        #     for i in range(start, end):
        #         dfs(target-arr[i], i, end, path+[arr[i]], arr)

        # dfs(target, 0, len(candidates), [], candidates)
        # return res

        res = []
        def dfs(total, temp, idx):
            if total == target:
                res.append(temp)
                return
            if idx == len(candidates):
                return
            if total+candidates[idx] <= target:
                dfs(total+candidates[idx], temp+[candidates[idx]], idx)
            dfs(total, temp, idx+1)
        dfs(0, [], 0)
        return res
# @lc code=end


# var combinationSum = function(candidates, target) {
#     const ans = [];
#     const dfs = (target, combine, idx) => {
#         if (idx === candidates.length) {
#             return;
#         }
#         if (target === 0) {
#             ans.push(combine);
#             return;
#         }
#         // 直接跳过
#         dfs(target, combine, idx + 1);
#         // 选择当前数
#         if (target - candidates[idx] >= 0) {
#             dfs(target - candidates[idx], [...combine, candidates[idx]], idx);
#         }
#     }

#     dfs(target, [], 0);
#     return ans;
# };


# from typing import List
# class Solution:
#     def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:

#         def dfs(candidates, begin, size, path, res, target):
#             if target < 0:
#                 return
#             if target == 0:
#                 res.append(path)
#                 return

#             for index in range(begin, size):
#                 dfs(candidates, index, size, path + [candidates[index]], res, target - candidates[index])

#         size = len(candidates)
#         if size == 0:
#             return []
#         path = []
#         res = []
#         dfs(candidates, 0, size, path, res, target)
#         return res
