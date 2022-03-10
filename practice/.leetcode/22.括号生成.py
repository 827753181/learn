#
# @lc app=leetcode.cn id=22 lang=python3
#
# [22] 括号生成
#
# https://leetcode-cn.com/problems/generate-parentheses/description/
#
# algorithms
# Medium (77.37%)
# Likes:    2404
# Dislikes: 0
# Total Accepted:    436K
# Total Submissions: 563.6K
# Testcase Example:  '3'
#
# 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
#
#
#
# 示例 1：
#
#
# 输入：n = 3
# 输出：["((()))","(()())","(())()","()(())","()()()"]
#
#
# 示例 2：
#
#
# 输入：n = 1
# 输出：["()"]
#
#
#
#
# 提示：
#
#
# 1 <= n <= 8
#
#
#

# @lc code=start
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        ans = []
        def backtrace(arr, left, right):
            if len(arr) == n*2:
                ans.append(''.join(arr))
            else:
                if(left < n):
                    arr.append('(')
                    backtrace(arr, left+1, right)
                    arr.pop()
                if(right < left):
                    arr.append(')')
                    backtrace(arr, left, right+1)
                    arr.pop()
        backtrace([], 0, 0)
        return ans
# @lc code=end


# class Solution:
#     def generateParenthesis(self, n: int) -> List[str]:
#         def generate(A):
#             if len(A) == 2*n:
#                 if valid(A):
#                     ans.append("".join(A))
#             else:
#                 A.append('(')
#                 generate(A)
#                 A.pop()
#                 A.append(')')
#                 generate(A)
#                 A.pop()

#         def valid(A):
#             bal = 0
#             for c in A:
#                 if c == '(': bal += 1
#                 else: bal -= 1
#                 if bal < 0: return False
#             return bal == 0

#         ans = []
#         generate([])
#         return ans


# class Solution:
#     def generateParenthesis(self, n: int) -> List[str]:
#         ans = []
#         def backtrack(S, left, right):
#             if len(S) == 2 * n:
#                 ans.append(''.join(S))
#                 return
#             if left < n:
#                 S.append('(')
#                 backtrack(S, left+1, right)
#                 S.pop()
#             if right < left:
#                 S.append(')')
#                 backtrack(S, left, right+1)
#                 S.pop()

#         backtrack([], 0, 0)
#         return ans


# class Solution:
#     @lru_cache(None)
#     def generateParenthesis(self, n: int) -> List[str]:
#         if n == 0:
#             return ['']
#         ans = []
#         for c in range(n):
#             for left in self.generateParenthesis(c):
#                 for right in self.generateParenthesis(n-1-c):
#                     ans.append('({}){}'.format(left, right))
#         return ans
