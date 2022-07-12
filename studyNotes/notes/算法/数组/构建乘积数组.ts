// 题目
// 给定一个数组A[0,1,...,n-1],请构建一个数组B[0,1,...,n-1],其中B中的元素B[i]=A[0]*A[1]*...*A[i-1]*A[i+1]*...*A[n-1]。不能使用除法。
// #思路
// B[i]的值是A数组所有元素的乘积再除以A[i]，但是题目中给定不能用除法，我们换一个思路，将B[i]的每个值列出来，如下图：
// B[i]的值可以看作下图的矩阵中每行的乘积。
// B0   1   A1  A2   ...   An-2    An-1
// B1   A0  1   A2   ...   An-2    An-1
// B2   A0  A1  1    ...   An-2    An-1
// ...  A0  A1  ...  1     An-2    An-1
// Bn-2 A0  A1  ...  An-3  1    An-1
// Bn-1 A0  A1  ...  An-3  An-2 1
// 可以将B数组分为上下两个三角，先计算下三角，然后把上三角乘进去。

function multiply(array) {
	if (array == null || array.length === 0) return [];
	let result: number[] = [];
	// 计算下三角
	result[0] = 1;
	for (let i = 1; i < array.length; i++) {
		result[i] = result[i - 1] * array[i - 1];
	}

	// 计算上三角
	let temp = 1;
	for (let i = array.length - 2; i >= 0; i--) {
		temp *= array[i + 1];
		result[i] *= temp;
	}
	return result;
}
