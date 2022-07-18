/*
 * @lc app=leetcode.cn id=54 lang=typescript
 *
 * [54] 螺旋矩阵
 *
 * https://leetcode.cn/problems/spiral-matrix/description/
 *
 * algorithms
 * Medium (48.84%)
 * Likes:    1147
 * Dislikes: 0
 * Total Accepted:    284.3K
 * Total Submissions: 580.7K
 * Testcase Example:  '[[1,2,3],[4,5,6],[7,8,9]]'
 *
 * 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * 输出：[1,2,3,6,9,8,7,4,5]
 *
 *
 * 示例 2：
 *
 *
 * 输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
 * 输出：[1,2,3,4,8,12,11,10,9,5,6,7]
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == matrix.length
 * n == matrix[i].length
 * 1
 * -100
 *
 *
 */

// @lc code=start
function spiralOrder(matrix: number[][]): number[] {
	if (matrix == null || matrix[0].length === 0) return [];
	let rows = matrix.length;
	let columns = matrix[0].length;
	let startRow = 0,
		startColumn = 0,
		endRow = rows - 1,
		endColumn = columns - 1;

	const res: number[] = [];

	while (startRow < rows / 2 && startColumn < columns / 2) {
		for (let j = startColumn; j <= endColumn; j++) {
			res.push(matrix[startRow][j]);
		}
		if (endRow > startRow) {
			for (let i = startRow + 1; i <= endRow; i++) {
				res.push(matrix[i][endColumn]);
			}
			if (startColumn < endColumn) {
				for (let j = endColumn - 1; j >= startColumn; j--) {
					res.push(matrix[endRow][j]);
				}
				if (startRow < endRow) {
					for (let i = endRow - 1; i > startRow; i--) {
						res.push(matrix[i][startColumn]);
					}
				}
			}
		}
		startColumn++;
		endColumn--;
		startRow++;
		endRow--;
	}

	return res;
}
// @lc code=end
