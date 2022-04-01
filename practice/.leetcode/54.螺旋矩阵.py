#
# @lc app=leetcode.cn id=54 lang=python3
#
# [54] 螺旋矩阵
#
# https://leetcode-cn.com/problems/spiral-matrix/description/
#
# algorithms
# Medium (48.42%)
# Likes:    1036
# Dislikes: 0
# Total Accepted:    241.1K
# Total Submissions: 496.7K
# Testcase Example:  '[[1,2,3],[4,5,6],[7,8,9]]'
#
# 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
#
#
#
# 示例 1：
#
#
# 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
# 输出：[1,2,3,6,9,8,7,4,5]
#
#
# 示例 2：
#
#
# 输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
# 输出：[1,2,3,4,8,12,11,10,9,5,6,7]
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
# -100
#
#
#

# @lc code=start
class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        if not matrix or not matrix[0]:
            return list()
        m = len(matrix)
        n = len(matrix[0])
        ans = []

        # left, right, top, bottom = 0, n-1, 0, m-1
        # while left <= right and top <= bottom:
        #     for j in range(left, right+1):
        #         ans.append(matrix[top][j])
        #     top += 1
        #     for i in range(top, bottom+1):
        #         ans.append(matrix[i][right])
        #     right -= 1
        #     if left <= right and top <= bottom:
        #         for j in range(right, left-1, -1):
        #             ans.append(matrix[bottom][j])
        #         bottom -= 1
        #         for i in range(bottom, top-1, -1):
        #             ans.append(matrix[i][left])
        #         left += 1

        direction = [[0, 1], [1, 0], [0, -1], [-1, 0]]
        total = m*n
        directionIdx, row, column = 0, 0, 0
        visited = [[False]*n for _ in range(m)]
        for i in range(0, total):
            ans.append(matrix[row][column])
            visited[row][column] = True
            nextRow = row+direction[directionIdx][0]
            nextColumn = column+direction[directionIdx][1]
            if nextRow < 0 or nextColumn < 0 or nextRow >= m or nextColumn >= n or visited[nextRow][nextColumn]:
                directionIdx = (directionIdx+1) % 4
            row += direction[directionIdx][0]
            column += direction[directionIdx][1]
        return ans
# @lc code=end


# var spiralOrder = function(matrix) {
#     if (!matrix.length || !matrix[0].length) {
#         return [];
#     }
#     const rows = matrix.length, columns = matrix[0].length;
#     const visited = new Array(rows).fill(0).map(() => new Array(columns).fill(false));
#     const total = rows * columns;
#     const order = new Array(total).fill(0);

#     let directionIndex = 0, row = 0, column = 0;
#     const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
#     for (let i = 0; i < total; i++) {
#         order[i] = matrix[row][column];
#         visited[row][column] = true;
#         const nextRow = row + directions[directionIndex][0], nextColumn = column + directions[directionIndex][1];
#         if (!(0 <= nextRow && nextRow < rows && 0 <= nextColumn && nextColumn < columns && !(visited[nextRow][nextColumn]))) {
#             directionIndex = (directionIndex + 1) % 4;
#         }
#         row += directions[directionIndex][0];
#         column += directions[directionIndex][1];
#     }
#     return order;
# };


# class Solution:
#     def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
#         if not matrix or not matrix[0]:
#             return list()

#         rows, columns = len(matrix), len(matrix[0])
#         order = list()
#         left, right, top, bottom = 0, columns - 1, 0, rows - 1
#         while left <= right and top <= bottom:
#             for column in range(left, right + 1):
#                 order.append(matrix[top][column])
#             for row in range(top + 1, bottom + 1):
#                 order.append(matrix[row][right])
#             if left < right and top < bottom:
#                 for column in range(right - 1, left, -1):
#                     order.append(matrix[bottom][column])
#                 for row in range(bottom, top, -1):
#                     order.append(matrix[row][left])
#             left, right, top, bottom = left + 1, right - 1, top + 1, bottom - 1
#         return order
