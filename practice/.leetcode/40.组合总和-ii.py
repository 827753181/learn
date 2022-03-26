#
# @lc app=leetcode.cn id=40 lang=python3
#
# [40] 组合总和 II
#
# https://leetcode-cn.com/problems/combination-sum-ii/description/
#
# algorithms
# Medium (61.26%)
# Likes:    868
# Dislikes: 0
# Total Accepted:    252.8K
# Total Submissions: 413.5K
# Testcase Example:  '[10,1,2,7,6,1,5]\n8'
#
# 给定一个候选人编号的集合 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
#
# candidates 中的每个数字在每个组合中只能使用 一次 。
#
# 注意：解集不能包含重复的组合。 
#
#
#
# 示例 1:
#
#
# 输入: candidates = [10,1,2,7,6,1,5], target = 8,
# 输出:
# [
# [1,1,6],
# [1,2,5],
# [1,7],
# [2,6]
# ]
#
# 示例 2:
#
#
# 输入: candidates = [2,5,2,1,2], target = 5,
# 输出:
# [
# [1,2,2],
# [5]
# ]
#
#
#
# 提示:
#
#
# 1 <= candidates.length <= 100
# 1 <= candidates[i] <= 50
# 1 <= target <= 30
#
#
#

# @lc code=start
from typing import List


class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:

        size = len(candidates)
        if target == 0 or size == 0:
            return []

        ans = []

        def dfs(start: int, end: int, target: int, path: list):
            if target == 0:
                ans.append(path[:])
                return
            for i in range(start, end):
                if candidates[i] > target: 
                    break

                # 解集不能包含重复的组合。 
                if i > start and candidates[i] == candidates[i-1]:
                    continue
                
                path.append(candidates[i])
                dfs(i+1, end, target - candidates[i], path)
                path.pop()
        candidates.sort()
        dfs(0, size, target, [])

        return ans
# @lc code=end


# class Solution:
#     def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
#         def dfs(pos: int, rest: int):
#             nonlocal sequence
#             if rest == 0:
#                 ans.append(sequence[:])
#                 return
#             if pos == len(freq) or rest < freq[pos][0]:
#                 return

#             dfs(pos + 1, rest)

#             most = min(rest // freq[pos][0], freq[pos][1])
#             for i in range(1, most + 1):
#                 sequence.append(freq[pos][0])
#                 dfs(pos + 1, rest - i * freq[pos][0])
#             sequence = sequence[:-most]

#         freq = sorted(collections.Counter(candidates).items())
#         ans = list()
#         sequence = list()
#         dfs(0, target)
#         return ans


# class Solution:

#     def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
#         def dfs(begin, path, residue):
#             if residue == 0:
#                 res.append(path[:])
#                 return

#             for index in range(begin, size):
#                 if candidates[index] > residue:
#                     break

#                 if index > begin and candidates[index - 1] == candidates[index]:
#                     continue

#                 path.append(candidates[index])
#                 dfs(index + 1, path, residue - candidates[index])
#                 path.pop()

#         size = len(candidates)
#         if size == 0:
#             return []

#         candidates.sort()
#         res = []
#         dfs(0, [], target)
#         return res
