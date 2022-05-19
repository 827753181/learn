#
# @lc app=leetcode.cn id=79 lang=python3
#
# [79] 单词搜索
#
# https://leetcode-cn.com/problems/word-search/description/
#
# algorithms
# Medium (46.17%)
# Likes:    1253
# Dislikes: 0
# Total Accepted:    295.6K
# Total Submissions: 639.7K
# Testcase Example:  '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]\n"ABCCED"'
#
# 给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false 。
#
# 单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。
#
#
#
# 示例 1：
#
#
# 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word =
# "ABCCED"
# 输出：true
#
#
# 示例 2：
#
#
# 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word =
# "SEE"
# 输出：true
#
#
# 示例 3：
#
#
# 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word =
# "ABCB"
# 输出：false
#
#
#
#
# 提示：
#
#
# m == board.length
# n = board[i].length
# 1
# 1
# board 和 word 仅由大小写英文字母组成
#
#
#
#
# 进阶：你可以使用搜索剪枝的技术来优化解决方案，使其在 board 更大的情况下可以更快解决问题？
#
#

# @lc code=start
class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        if not board:
            return False

        directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]
        visited = set()

        rowLen = len(board)
        colLen = len(board[0])

        def check(i, j, k) -> bool:

            if board[i][j] != word[k]:
                return False
            if k == len(word) - 1:
                return True

            visited.add((i, j))
            result = False

            for di, dj in directions:
                newI, newJ = i+di, j+dj
                if (newI, newJ) not in visited and 0 <= newI < rowLen and 0 <= newJ < colLen and check(newI, newJ, k+1):
                    result = True
                    break
            visited.remove((i, j))
            return result

        for i in range(rowLen):
            for j in range(colLen):
                if check(i, j, 0):
                    return True
        return False
# @lc code=end

# class Solution:
#     def exist(self, board: List[List[str]], word: str) -> bool:
#         directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]

#         def check(i: int, j: int, k: int) -> bool:
#             if board[i][j] != word[k]:
#                 return False
#             if k == len(word) - 1:
#                 return True

#             visited.add((i, j))
#             result = False
#             for di, dj in directions:
#                 newi, newj = i + di, j + dj
#                 if 0 <= newi < len(board) and 0 <= newj < len(board[0]):
#                     if (newi, newj) not in visited:
#                         if check(newi, newj, k + 1):
#                             result = True
#                             break

#             visited.remove((i, j))
#             return result

#         h, w = len(board), len(board[0])
#         visited = set()
#         for i in range(h):
#             for j in range(w):
#                 if check(i, j, 0):
#                     return True

#         return False
