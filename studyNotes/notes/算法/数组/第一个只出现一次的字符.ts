// #思路
// #思路1:
// 用一个map存储每个字符出现的字数
// 第一次循环存储次数，第二次循环找到第一个出现一次的字符。
// 时间复杂度O(n)、空间复杂度O(n)

// #思路二：
// 使用js的array提供的indexOf和lastIndexOf方法
// 遍历字符串，比较每个字符第一次和最后一次出现的位置是否相同。
// indexOf的时间复杂度为O(n)，所以整体的时间复杂度为O(n2)，空间复杂度为0。

function FirstNotRepeatingChar(str: string) {
	if (!str || str === "") return -1;

	/*
    // 思路一
	const ss = str.split("");
    const m = {};
	ss.forEach((s) => (m[s] = m[s] ? m[s] + 1 : 1));
	for (let i = 0; i < ss.length; i++) {
		const key = ss[i];
		if (m[key] === 1) return m[key];
	}
    */

    // 思路二
	for (let i = 0; i < str.length; i++) {
		if (str.indexOf(str[i]) === str.lastIndexOf(str[i])) {
			return str[i];
		}
	}
	return -1;
}
