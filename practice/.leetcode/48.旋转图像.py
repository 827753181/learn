#
# @lc app=leetcode.cn id=48 lang=python3
#
# [48] 旋转图像
#
# https://leetcode-cn.com/problems/rotate-image/description/
#
# algorithms
# Medium (73.81%)
# Likes:    1222
# Dislikes: 0
# Total Accepted:    293.9K
# Total Submissions: 397.5K
# Testcase Example:  '[[1,2,3],[4,5,6],[7,8,9]]'
#
# 给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。
#
# 你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。
#
#
#
# 示例 1：
#
#
# 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
# 输出：[[7,4,1],[8,5,2],[9,6,3]]
#
#
# 示例 2：
#
#
# 输入：matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
# 输出：[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
#
#
#
#
# 提示：
#
#
# n == matrix.length == matrix[i].length
# 1 <= n <= 20
# -1000 <= matrix[i][j] <= 1000
#
#
#
#
#

# @lc code=start
class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        n = len(matrix)

        for i in range((n+1)//2):
            for j in range(n//2):
                temp = matrix[i][j]
                matrix[i][j] = matrix[n-j-1][i]
                matrix[n-j-1][i] = matrix[n-i-1][n-j-1]
                matrix[n-i-1][n-j-1] = matrix[j][n-i-1]
                matrix[j][n-i-1] = temp
        """
        Do not return anything, modify matrix in-place instead.
        """
        pass
# @lc code=end


# class Solution:
#     def rotate(self, matrix: List[List[int]]) -> None:
#         n = len(matrix)
#         # Python 这里不能 matrix_new = matrix 或 matrix_new = matrix[:] 因为是引用拷贝
#         matrix_new = [[0] * n for _ in range(n)]
#         for i in range(n):
#             for j in range(n):
#                 matrix_new[j][n - i - 1] = matrix[i][j]
#         # 不能写成 matrix = matrix_new
#         matrix[:] = matrix_new


# var rotate = function(matrix) {
#     const n = matrix.length;
#     for (let i = 0; i < Math.floor(n / 2); ++i) {
#         for (let j = 0; j < Math.floor((n + 1) / 2); ++j) {
#             const temp = matrix[i][j];
#             matrix[i][j] = matrix[n - j - 1][i];
#             matrix[n - j - 1][i] = matrix[n - i - 1][n - j - 1];
#             matrix[n - i - 1][n - j - 1] = matrix[j][n - i - 1];
#             matrix[j][n - i - 1] = temp;
#         }
#     }
# };

# var rotate = function(matrix) {
#     const n = matrix.length;
#     // 水平翻转
#     for (let i = 0; i < Math.floor(n / 2); i++) {
#         for (let j = 0; j < n; j++) {
#             [matrix[i][j], matrix[n - i - 1][j]] = [matrix[n - i - 1][j], matrix[i][j]];
#         }
#     }
#     // 主对角线翻转
#     for (let i = 0; i < n; i++) {
#         for (let j = 0; j < i; j++) {
#             [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
#         }
#     }
# };
