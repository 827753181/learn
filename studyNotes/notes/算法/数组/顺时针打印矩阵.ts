// # 题目
// 输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。
// 例如，如果输入如下4 X 4矩阵：
// 1 2 3 4
// 5 6 7 8
// 9 10 11 12
// 13 14 15 16
// 则依次打印出数字1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10.

// # 思路
// 借助图形思考，将复杂的矩阵拆解成若干个圈，循环打印矩阵，每次打印其中一个圈
// 设起点坐标为(start,start)，矩阵的行数为rows，矩阵的列数为columns
// 循环结束条件为 rows>start*2 并且 columns>start*2
// 将打印一圈拆解为四部，
// 第一步：从左到右打印一行
// 第二步：从上到下打印一列
// 第三步：从右到左打印一行
// 第四步：从下到上打印一列
// 最后一圈很有可能出现几种异常情况,打印矩阵最里面一圈可能只需三步、两步、甚至一步
// 所以在每一行打印时要做好条件判断:
// 能走到最后一圈，从左到右必定会打印
// 结束行号大于开始行号，需要从上到下打印
// 结束列号大于开始列号，需要从右到左打印
// 结束行号大于开始行号+1，需要从下到上打印
function printMatrix(matrix: number[][]) {
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
      // 判断行号，如果不符合不能往下走
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
/* 
  题解方法，本质上一样的
  // 顺时针打印
 function printMatrix(matrix) {
    var start = 0;
    var rows = matrix.length;
    var coloums = matrix[0].length;
    var result = [];
    if (!rows || !coloums) {
      return false;
    }
    while (coloums > start * 2 && rows > start * 2) {
      printCircle(matrix, start, coloums, rows, result);
      start++;
    }
    return result;
  }

  // 打印一圈
  function printCircle(matrix, start, coloums, rows, result) {
    var entX = coloums - start - 1;
    var endY = rows - start - 1;
    for (var i = start; i <= entX; i++) {
      result.push(matrix[start][i]);
    }
    if (endY > start) {
      for (var i = start + 1; i <= endY; i++) {
        result.push(matrix[i][entX]);
      }
      if (entX > start) {
        for (var i = entX - 1; i >= start; i--) {
          result.push(matrix[endY][i]);
        }
        if (endY > start + 1) {
          for (var i = endY - 1; i > start; i--) {
            result.push(matrix[i][start]);
          }
        }
      }
    }
  } */
