// 删除链表中的节点
// 给定单链表的头指针和要删除的指针节点，在O(1)时间内删除该节点。

// 1.删除的节点不是尾部节点 - 将next节点覆盖当前节点
// 2.删除的节点是尾部节点且等于头节点，只剩一个节点 - 将头节点置为null
// 3.删除的节点是尾节点且前面还有节点 - 遍历到末尾的前一个节点删除
function deleteNode(head, node) {
	if (!head || !node || head === node) {
		return null;
	}
	if (node.next) {
		node.val = node.next.val;
		node.next = node.next.next;
		return node;
	}
    
	while (head.next) {
		if (head.next === node) {
			head.next = null;
			head.val = null;
			return head;
		}
	}
}
