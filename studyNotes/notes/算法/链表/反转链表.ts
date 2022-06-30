// 反转链表
// 输入一个链表，反转链表后，输出新链表的表头。

// #思路
// 以链表的头部节点为基准节点
// 将基准节点的下一个节点挪到头部作为头节点
// 当基准节点的next为null，则其已经成为最后一个节点，链表已经反转完成

function revertList(head) {
	let currentNode = null;
	let headNode = head;
	while (head && head.next) {
        // 取出基准节点head的下一个节点
		currentNode = head.next;
        
        // 将其（基准节点head的下一个节点）移动到链表头部作为头节点
		head.next = currentNode.next;
		currentNode.next = headNode;

        // 标志反转一个节点后，真实的头节点
		headNode = currentNode;
	}
    // 当基准节点的next为null，则其已经成为最后一个节点，链表已经反转完成，返回真实头节点
	return headNode;
}
