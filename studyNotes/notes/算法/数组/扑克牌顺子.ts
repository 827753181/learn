// #题目
// 扑克牌中随机抽5张牌，判断是不是一个顺子，即这5张牌是不是连续的。
// 2-10为数字本身，A为1，J为11...大小王可以看成任何数字，可以把它当作0处理。

// #思路
// 1.数组排序
// 2.遍历数组
// 3.若为0，记录0的个数加1
// 4.若不为0，记录和下一个元素的间隔
// 5.最后比较0的个数和间隔数，间隔数>0的个数则不能构成顺子
// 6.注意中间如果有两个元素相等则不能构成顺子

function IsContinuous(numbers: number[]) {
	if (numbers == null || numbers.length <= 0) return false;

    /* numbers.sort();
    let zeroNum = 0;
    let spaceNum = 0;
    for (let i = 0; i < numbers.length - 1; i++) {
        if (numbers[i] === 0) {
            zeroNum++;
        } else {
            const space = numbers[i + 1] - numbers[i];
            if (space == 0) {
                return false;
            } else {
                spaceNum += space - 1;
            }
        }
    }
    return zeroNum - spaceNum >= 0; */


	numbers.sort((a, b) => a - b);
	let spaceNum = 0;
	let zeroNum = 0;
	let hasEqual = false;

	numbers.reduce((pre, cur) => {
		if (pre === 0) {
			zeroNum++;
		} else if (cur - pre === 0) {
			hasEqual = true;
		} else {
			spaceNum += cur - pre - 1;
		}
		return cur;
	});

	return hasEqual ? false : spaceNum <= zeroNum;
}
