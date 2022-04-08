#
# @lc app=leetcode.cn id=59 lang=python3
#
# [59] 螺旋矩阵 II
#
# https://leetcode-cn.com/problems/spiral-matrix-ii/description/
#
# algorithms
# Medium (77.41%)
# Likes:    647
# Dislikes: 0
# Total Accepted:    177.1K
# Total Submissions: 230.7K
# Testcase Example:  '3'
#
# 给你一个正整数 n ，生成一个包含 1 到 n^2 所有元素，且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix 。
#
#
#
# 示例 1：
#
#
# 输入：n = 3
# 输出：[[1,2,3],[8,9,4],[7,6,5]]
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

# @lc code=start
class Solution:
    def generateMatrix(self,n):
        j = 0
        addArr = [[0, 1], [1, 0], [0, -1], [-1, 0]]
        x, y = 0, 0
        ans = [[False]*n for i in range(n)]
        for i in range(1, n**2+1):
            ans[x][y] = i
            finalX, finalY = x+addArr[j][0], y+addArr[j][1]
            if finalX >= n or finalX < 0 or finalY >= n or finalY < 0 or ans[finalX][finalY]:
                j = (j+1) % 4
            x, y = x+addArr[j][0], y+addArr[j][1]
        return ans
# @lc code=end


# var generateMatrix = function(n) {
#     const maxNum = n * n;
#     let curNum = 1;
#     const matrix = new Array(n).fill(0).map(() => new Array(n).fill(0));
#     let row = 0, column = 0;
#     const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // 右下左上
#     let directionIndex = 0;
#     while (curNum <= maxNum) {
#         matrix[row][column] = curNum;
#         curNum++;
#         const nextRow = row + directions[directionIndex][0], nextColumn = column + directions[directionIndex][1];
#         if (nextRow < 0 || nextRow >= n || nextColumn < 0 || nextColumn >= n || matrix[nextRow][nextColumn] !== 0) {
#             directionIndex = (directionIndex + 1) % 4; // 顺时针旋转至下一个方向
#         }
#         row = row + directions[directionIndex][0];
#         column = column + directions[directionIndex][1];
#     }
#     return matrix;
# };


# class Solution:
#     def generateMatrix(self, n: int) -> List[List[int]]:
#         matrix = [[0] * n for _ in range(n)]
#         num = 1
#         left, right, top, bottom = 0, n - 1, 0, n - 1

#         while left <= right and top <= bottom:
#             for col in range(left, right + 1):
#                 matrix[top][col] = num
#                 num += 1
#             for row in range(top + 1, bottom + 1):
#                 matrix[row][right] = num
#                 num += 1
#             if left < right and top < bottom:
#                 for col in range(right - 1, left, -1):
#                     matrix[bottom][col] = num
#                     num += 1
#                 for row in range(bottom, top, -1):
#                     matrix[row][left] = num
#                     num += 1
#             left += 1
#             right -= 1
#             top += 1
#             bottom -= 1

#         return matrix
