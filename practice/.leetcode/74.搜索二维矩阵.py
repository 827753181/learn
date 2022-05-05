#
# @lc app=leetcode.cn id=74 lang=python3
#
# [74] 搜索二维矩阵
#
# https://leetcode-cn.com/problems/search-a-2d-matrix/description/
#
# algorithms
# Medium (47.05%)
# Likes:    613
# Dislikes: 0
# Total Accepted:    219.8K
# Total Submissions: 466.4K
# Testcase Example:  '[[1,3,5,7],[10,11,16,20],[23,30,34,60]]\n3'
#
# 编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：
#
#
# 每行中的整数从左到右按升序排列。
# 每行的第一个整数大于前一行的最后一个整数。
#
#
#
#
# 示例 1：
#
#
# 输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
# 输出：true
#
#
# 示例 2：
#
#
# 输入：matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
# 输出：false
#
#
#
#
# 提示：
#
#
# m == matrix.length
# n == matrix[i].length
# 1
# -10^4
#
#
#

# @lc code=start
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        if not matrix:
            return False
        rowLen = len(matrix)
        colLen = len(matrix[0])
        rightSide = rowLen*colLen
        leftSide = 0
        midIndex = (leftSide+rightSide)//2 -1
        # i从0开始计数
        def getVal(index: int) -> any:
            j = index % colLen
            i = index // colLen
            return matrix[i][j]
        
        while True:
            midIndexValue = getVal(midIndex)
            newIndex = midIndex
            if target == midIndexValue:
                return True
            elif target < midIndexValue:
                newIndex = (leftSide+midIndex) // 2
                rightSide = midIndex
            else:
                newIndex = (midIndex+rightSide) // 2
                leftSide = midIndex

            if midIndex == newIndex:
                return False
            else:
                midIndex = newIndex
# @lc code=end
