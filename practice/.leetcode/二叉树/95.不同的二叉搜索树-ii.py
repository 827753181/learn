#
# @lc app=leetcode.cn id=95 lang=python3
#
# [95] 不同的二叉搜索树 II
#
# https://leetcode-cn.com/problems/unique-binary-search-trees-ii/description/
#
# algorithms
# Medium (71.58%)
# Likes:    1182
# Dislikes: 0
# Total Accepted:    125.3K
# Total Submissions: 174.8K
# Testcase Example:  '3'
#
# 给你一个整数 n ，请你生成并返回所有由 n 个节点组成且节点值从 1 到 n 互不相同的不同 二叉搜索树 。可以按 任意顺序 返回答案。
#
#
#
#
#
# 示例 1：
#
#
# 输入：n = 3
# 输出：[[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]
#
#
# 示例 2：
#
#
# 输入：n = 1
# 输出：[[1]]
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
#
#

# @lc code=start
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution:
    def generateTrees(self, n: int) -> List[TreeNode]:
        if n == 0:
            return []
        return self.helper(1, n)

    def helper(self, start, end):
        if start > end:
            return [None]
        all_trees = []
        for curRootVal in range(start, end+1):
            left_trees = self.helper(start, curRootVal-1)
            right_trees = self.helper(curRootVal+1, end)

            for left_tree in left_trees:
                for right_tree in right_trees:
                    curRoot = TreeNode(curRootVal)
                    curRoot.left = left_tree
                    curRoot.right = right_tree
                    all_trees.append(curRoot)
        return all_trees

# @lc code=end
