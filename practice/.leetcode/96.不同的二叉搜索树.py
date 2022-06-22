#
# @lc app=leetcode.cn id=96 lang=python3
#
# [96] 不同的二叉搜索树
#
# https://leetcode-cn.com/problems/unique-binary-search-trees/description/
#
# algorithms
# Medium (70.09%)
# Likes:    1685
# Dislikes: 0
# Total Accepted:    228.3K
# Total Submissions: 325.6K
# Testcase Example:  '3'
#
# 给你一个整数 n ，求恰由 n 个节点组成且节点值从 1 到 n 互不相同的 二叉搜索树 有多少种？返回满足题意的二叉搜索树的种数。
#
#
#
# 示例 1：
#
#
# 输入：n = 3
# 输出：5
#
#
# 示例 2：
#
#
# 输入：n = 1
# 输出：1
#
#
#
#
# 提示：
#
#
# 1
#
#
#

# @lc code=startf(i,n)
class Solution:
    def numTrees(self, n: int) -> int:
        dp = [0]*(n+1)
        dp[0] = 1
        for i in range(1, n+1):
            #循环计算i个元素条件下，能有多少种可能的二叉搜索树
            for j in range(0, i):
                # 左边能放多少元素，右边能放多少元素
                # 然后以j为顶点的元素的可能个数等于其笛卡尔积 dp[j]*dp[i-j-1]
                # 然后加到dp[i]里面计算i个元素可以有多少种可能的二叉搜索树
                dp[i] += dp[j]*dp[i-j-1]
        return dp[n]
# @lc code=end
