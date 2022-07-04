// # 题目
// 输入两个单调递增的链表，输出两个链表合成后的链表，当然我们需要合成后的链表满足单调不减规则。

// # 思路
// 链表头部节点比较，取较小节点。
// 小节点的next等于小节点的next和大节点的较小值。
// 如此递归。
// 返回小节点。
// 考虑代码的鲁棒性，也是递归的终止条件，两个head为null的情况，取对方节点返回。

function combineRaiseLink(head1, head2) {
	if (!head1) {
		return head2;
	}
	if (!head2) {
		return head1;
	}
	let head = null;
	if (head1.val < head2.val) {
		head = head1;
		head.next = combineRaiseLink(head1.next, head2);
	} else {
		head = head2;
		head.next = combineRaiseLink(head1, head2.next);
	}
	return head;
}
