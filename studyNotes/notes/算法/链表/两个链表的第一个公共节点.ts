// #题目
// 输入两个链表，找出它们的第一个公共结点。

// #思路
// 1.先找到两个链表的长度length1、length2
// 2.让长一点的链表先走length2-length1步，让长链表和短链表起点相同
// 3.两个链表一起前进，比较获得第一个相等的节点
// 时间复杂度O(length1+length2) 空间复杂度O(0)

function getLen(node) {
	let idx = 0;
	while (node) {
		node = node.next;
		idx++;
	}
	return idx;
}
function FindFirstCommonNode(pHead1, pHead2) {
	if (!pHead1 || !pHead2) return;
	let len1 = getLen(pHead1);
	let len2 = getLen(pHead2);
	let stepFirst, stepSecond;
	if (len1 > len2) {
		stepFirst = pHead1;
		stepSecond = pHead2;
	} else {
		stepFirst = pHead2;
		stepSecond = pHead1;
	}
	for (let i = 0; i < Math.abs(len1 - len2); i++) {
		stepFirst = stepFirst.next;
	}

	while (stepFirst) {
		if (stepFirst == stepSecond) return stepFirst;
		stepFirst = stepFirst.next;
		stepSecond = stepSecond.next;
	}
}
