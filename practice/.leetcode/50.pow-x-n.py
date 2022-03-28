#
# @lc app=leetcode.cn id=50 lang=python3
#
# [50] Pow(x, n)
#
# https://leetcode-cn.com/problems/powx-n/description/
#
# algorithms
# Medium (37.83%)
# Likes:    915
# Dislikes: 0
# Total Accepted:    270.4K
# Total Submissions: 715.3K
# Testcase Example:  '2.00000\n10'
#
# 实现 pow(x, n) ，即计算 x 的 n 次幂函数（即，x^n^ ）。
# 
# 
# 
# 示例 1：
# 
# 
# 输入：x = 2.00000, n = 10
# 输出：1024.00000
# 
# 
# 示例 2：
# 
# 
# 输入：x = 2.10000, n = 3
# 输出：9.26100
# 
# 
# 示例 3：
# 
# 
# 输入：x = 2.00000, n = -2
# 输出：0.25000
# 解释：2^-2 = 1/2^2 = 1/4 = 0.25
# 
# 
# 
# 
# 提示：
# 
# 
# -100.0 < x < 100.0
# -2^31 <= n <= 2^31-1
# -10^4 <= x^n <= 10^4
# 
# 
#

# @lc code=start
class Solution:
    def myPow(self, x: float, n: int) -> float:
        pass
# @lc code=end

# class Solution:
#     def myPow(self, x: float, n: int) -> float:
#         def quickMul(N):
#             if N == 0:
#                 return 1.0
#             y = quickMul(N // 2)
#             return y * y if N % 2 == 0 else y * y * x
        
#         return quickMul(n) if n >= 0 else 1.0 / quickMul(-n)

# class Solution:
#     def myPow(self, x: float, n: int) -> float:
#         def quickMul(N):
#             ans = 1.0
#             # 贡献的初始值为 x
#             x_contribute = x
#             # 在对 N 进行二进制拆分的同时计算答案
#             while N > 0:
#                 if N % 2 == 1:
#                     # 如果 N 二进制表示的最低位为 1，那么需要计入贡献
#                     ans *= x_contribute
#                 # 将贡献不断地平方
#                 x_contribute *= x_contribute
#                 # 舍弃 N 二进制表示的最低位，这样我们每次只要判断最低位即可
#                 N //= 2
#             return ans
        
#         return quickMul(n) if n >= 0 else 1.0 / quickMul(-n)
