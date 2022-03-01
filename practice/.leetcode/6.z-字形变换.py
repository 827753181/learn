#
# @lc app=leetcode.cn id=6 lang=python3
#
# [6] Z 字形变换
#
# https://leetcode-cn.com/problems/zigzag-conversion/description/
#
# algorithms
# Medium (51.08%)
# Likes:    1491
# Dislikes: 0
# Total Accepted:    361.2K
# Total Submissions: 707.1K
# Testcase Example:  '"PAYPALISHIRING"\n3'
#
# 将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。
#
# 比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：
#
#
# P   A   H   N
# A P L S I I G
# Y   I   R
#
# 之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"。
#
# 请你实现这个将字符串进行指定行数变换的函数：
#
#
# string convert(string s, int numRows);
#
#
#
# 示例 1：
#
#
# 输入：s = "PAYPALISHIRING", numRows = 3
# 输出："PAHNAPLSIIGYIR"
#
# 示例 2：
#
#
# 输入：s = "PAYPALISHIRING", numRows = 4
# 输出："PINALSIGYAHRPI"
# 解释：
# P     I    N
# A   L S  I G
# Y A   H R
# P     I
#
#
# 示例 3：
#
#
# 输入：s = "A", numRows = 1
# 输出："A"
#
#
#
#
# 提示：
#
#
# 1
# s 由英文字母（小写和大写）、',' 和 '.' 组成
# 1
#
#
#

# @lc code=start


from itertools import chain


class Solution:
    def convert(self, s: str, numRows: int) -> str:
        n, r = len(s), numRows
        if r == 1 or r >= n:
            return s
        t = r*2-2
        ans = []
        for i in range(r):  # 枚举矩阵的行
            for j in range(0, n-i, t):  # 枚举每个周期的起始下标
                ans.append(s[j+i])  # 周期内第一个字符下标
                if 0 < i < r-1 and j+t-i < n:
                    ans.append(s[j+t-i])  # 周期内第二个字符下标
        return ''.join(ans)

    # @lc code=end

    # def convert(self, s: str, numRows: int) -> str:
    #     n, r = len(s), numRows
    #     if r == 1 or r >= n:
    #         return s
    #     t = r*2-2 # 一个周期占的格数
    #     c = (n+t-1)//t*(r-1) # 总行数=周期数*一个周期占用行数=总字符数//周期字符数*一个周期占用行数
    #     mat = [['']*c for _ in range(r)]

    #     x, y = 0, 0
    #     for i, ch in enumerate(s):
    #         mat[x][y] = ch
    #         if i % t < r-1:
    #             x += 1 # 向下移动
    #         else:
    #             y += 1
    #             x -= 1 # 向右上移动
    #     return ''.join(ch for rows in mat for ch in rows if ch)

    # class Solution:
    #     def convert(self, s: str, numRows: int) -> str:
    #         r = numRows
    #         if r == 1 or r >= len(s):
    #             return s
    #         mat = [[] for _ in range(r)]
    #         t, x = r * 2 - 2, 0
    #         for i, ch in enumerate(s):
    #             mat[x].append(ch)
    #             x += 1 if i % t < r - 1 else -1
    #         return ''.join(chain(*mat))

    # class Solution:
    #     def convert(self, s: str, numRows: int) -> str:
    #         n, r = len(s), numRows
    #         if r == 1 or r >= n:
    #             return s
    #         t = r * 2 - 2
    #         ans = []
    #         for i in range(r):  # 枚举矩阵的行
    #             for j in range(0, n - i, t):  # 枚举每个周期的起始下标
    #                 ans.append(s[j + i])  # 当前周期的第一个字符
    #                 if 0 < i < r - 1 and j + t - i < n:
    #                     ans.append(s[j + t - i])  # 当前周期的第二个字符
    #         return ''.join(ans)
