// # 题目
// 输入一个复杂链表（每个节点中有节点值，以及两个指针，一个指向下一个节点，另一个特殊指针指向任意一个节点），返回结果为复制后复杂链表的head。

// # 思路
// 拆分成三步
// 1.复制一份链表放在前一个节点后面，即根据原始链表的每个节点N创建N`,把N直接放在N`的next位置，让复制后的链表和原始链表组成新的链表。
// 2.给复制的链表random赋值，即N`.random=N.random.next。
// 3.拆分链表，将N`和N进行拆分，保证原始链表不受影响。

function Clone(head) {
	if (!head) {
		return null;
	}
	cloneNode(head);
	cloneRandom(head);
	return recoverConnection(head);
}

/* 
 input: a->b->c
 output:a->a'->b->b'->c->c'
*/
function cloneNode(head) {
	let current = head;
	while (current) {
		let cloneNode = {
			val: current.val,
			next: current.next,
		};
		current.next = cloneNode;
		current = cloneNode.next;
	}
	return head;
}

/* 
    make a'.random = (a.random)'
*/
function cloneRandom(head) {
	let current = head;
	while (current) {
		let cloneNode = current.next;
		cloneNode.random = current.random ? current.random.next : null;
		current = cloneNode.next;
	}
}
function recoverConnection(head) {
	let current = head;
	let cloneCurrent = head.next;
	let cloneHead = current.next;
	while (current) {
		// 解除未克隆的节点到克隆节点的连接
		current.next = cloneCurrent.next;
		current = cloneCurrent.next;

		// 创建克隆节点之间的连接
		if (current) {
			cloneCurrent.next = current.next;
			cloneCurrent = current.next;
		} else {
			cloneCurrent.next = null;
		}
	}
	return cloneHead;
}
