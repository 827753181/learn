#
# @lc app=leetcode.cn id=36 lang=python3
#
# [36] 有效的数独
#
# https://leetcode-cn.com/problems/valid-sudoku/description/
#
# algorithms
# Medium (63.61%)
# Likes:    788
# Dislikes: 0
# Total Accepted:    253.7K
# Total Submissions: 399.1K
# Testcase Example:  '[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]'
#
# 请你判断一个 9 x 9 的数独是否有效。只需要 根据以下规则 ，验证已经填入的数字是否有效即可。
#
#
# 数字 1-9 在每一行只能出现一次。
# 数字 1-9 在每一列只能出现一次。
# 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。（请参考示例图）
#
#
#
#
# 注意：
#
#
# 一个有效的数独（部分已被填充）不一定是可解的。
# 只需要根据以上规则，验证已经填入的数字是否有效即可。
# 空白格用 '.' 表示。
#
#
#
#
# 示例 1：
#
#
# 输入：board =
# [["5","3",".",".","7",".",".",".","."]
# ,["6",".",".","1","9","5",".",".","."]
# ,[".","9","8",".",".",".",".","6","."]
# ,["8",".",".",".","6",".",".",".","3"]
# ,["4",".",".","8",".","3",".",".","1"]
# ,["7",".",".",".","2",".",".",".","6"]
# ,[".","6",".",".",".",".","2","8","."]
# ,[".",".",".","4","1","9",".",".","5"]
# ,[".",".",".",".","8",".",".","7","9"]]
# 输出：true
#
#
# 示例 2：
#
#
# 输入：board =
# [["8","3",".",".","7",".",".",".","."]
# ,["6",".",".","1","9","5",".",".","."]
# ,[".","9","8",".",".",".",".","6","."]
# ,["8",".",".",".","6",".",".",".","3"]
# ,["4",".",".","8",".","3",".",".","1"]
# ,["7",".",".",".","2",".",".",".","6"]
# ,[".","6",".",".",".",".","2","8","."]
# ,[".",".",".","4","1","9",".",".","5"]
# ,[".",".",".",".","8",".",".","7","9"]]
# 输出：false
# 解释：除了第一行的第一个数字从 5 改为 8 以外，空格内其他数字均与 示例1 相同。 但由于位于左上角的 3x3 宫内有两个 8 存在,
# 因此这个数独是无效的。
#
#
#
# 提示：
#
#
# board.length == 9
# board[i].length == 9
# board[i][j] 是一位数字（1-9）或者 '.'
#
#
#

# @lc code=start
class Solution:
    def isValidSudoku(self, board: List[List[str]]) -> bool:
        rows = [[0 for _ in range(9)] for _ in range(9)]
        columns = [[0 for _ in range(9)] for _ in range(9)]
        subBox = [[[0 for _ in range(9)] for _ in range(3)] for _ in range(3)]
        for i in range(9):
            for j in range(9):
                ch = board[i][j]
                if ch == '.':
                    continue
                index = ord(ch) - ord('0') - 1
                rows[i][index] += 1
                columns[j][index] += 1
                subBox[i//3][j//3][index] += 1
                if rows[i][index] > 1 or columns[j][index] > 1 or subBox[i//3][j//3][index] > 1:
                    return False
        return True
# @lc code=end


# var isValidSudoku = function(board) {
#     const rows = new Array(9).fill(0).map(() => new Array(9).fill(0));
#     const columns = new Array(9).fill(0).map(() => new Array(9).fill(0));
#     const subboxes = new Array(3).fill(0).map(() => new Array(3).fill(0).map(() => new Array(9).fill(0)));
#     for (let i = 0; i < 9; i++) {
#         for (let j = 0; j < 9; j++) {
#             const c = board[i][j];
#             if (c !== '.') {
#                 const index = c.charCodeAt() - '0'.charCodeAt() - 1;
#                 rows[i][index]++;
#                 columns[j][index]++;
#                 subboxes[Math.floor(i / 3)][Math.floor(j / 3)][index]++;
#                 if (rows[i][index] > 1 || columns[j][index] > 1 || subboxes[Math.floor(i / 3)][Math.floor(j / 3)][index] > 1) {
#                     return false;
#                 }
#             }
#         }
#     }
#     return true;
# };


# class Solution {
# public:
#     bool isValidSudoku(vector<vector<char>>& board) {
#         int row[9][10] = {0};// 哈希表存储每一行的每个数是否出现过，默认初始情况下，每一行每一个数都没有出现过
#         // 整个board有9行，第二维的维数10是为了让下标有9，和数独中的数字9对应。
#         int col[9][10] = {0};// 存储每一列的每个数是否出现过，默认初始情况下，每一列的每一个数都没有出现过
#         int box[9][10] = {0};// 存储每一个box的每个数是否出现过，默认初始情况下，在每个box中，每个数都没有出现过。整个board有9个box。
#         for(int i=0; i<9; i++){
#             for(int j = 0; j<9; j++){
#                 // 遍历到第i行第j列的那个数,我们要判断这个数在其所在的行有没有出现过，
#                 // 同时判断这个数在其所在的列有没有出现过
#                 // 同时判断这个数在其所在的box中有没有出现过
#                 if(board[i][j] == '.') continue;
#                 int curNumber = board[i][j]-'0';
#                 if(row[i][curNumber]) return false;
#                 if(col[j][curNumber]) return false;
#                 if(box[j/3 + (i/3)*3][curNumber]) return false;

#                 row[i][curNumber] = 1;// 之前都没出现过，现在出现了，就给它置为1，下次再遇见就能够直接返回false了。
#                 col[j][curNumber] = 1;
#                 box[j/3 + (i/3)*3][curNumber] = 1;
#             }
#         }
#         return true;
#     }
# };
