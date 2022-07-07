// 删除链表中重复的节点

// 方法1.存储链表中元素出现的次数
// 1.用一个map存储每个节点出现的次数
// 2.删除出现次数大于1的节点
// 此方法删除节点时可以使用上面总结的办法。
// 时间复杂度：O(n)
// 空间复杂度：O(n)
/* 
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
function deleteMutiNode(head) {
	if (!head || !head.next) return head;
	let mapNode = {};
	let mutiNode = [];
	let node = head;
	while (node) {
		if (mapNode[node.val]) mapNode[node.val] = 1;
		else mutiNode.push(node);
		node = node.next;
	}
	mutiNode.forEach((val) => {
		deleteNode(head, val);
	});
	return head;
}
 */

// 方法2.重新比较连接数组
// 链表是排好顺序的，所以重复元素都会相邻出现 递归链表：
// 1.当前节点或当前节点的next为空，返回该节点
// 2.当前节点是重复节点：找到后面第一个不重复的节点
// 3.当前节点不重复：将当前的节点的next赋值为下一个不重复的节点

function deleteMutiNode(head) {
	if (!head || !head.next) return head;
	if (head.val === head.next.val) {
		let tempNode = head.next;
		while (tempNode && head.val === tempNode.val) {
			tempNode = tempNode.next;
		}
		return deleteMutiNode(tempNode);
	} else {
		head.next = deleteMutiNode(head.next);
		return head;
	}
}
/* function deleteMutiNode(head) {
	if (!head || !head.next) return head;
	let node = head;
	while (node && node.next) {
		while (node && node.next && node.next.val === node.val) {
			node.next = node.next.next;
		}
		node = node.next;
	}
	return head;
}
 */
