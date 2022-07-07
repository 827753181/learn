// 题目
// 给一个链表，若其中包含环，请找出该链表的环的入口结点，否则，输出null。

// #思路1
// 声明两个指针 P1 P2
// 1.判断链表是否有环： P1 P2 从头部出发，P1走两步，P2走一步，如果可以相遇，则环存在
// 2.从环内某个节点开始计数，再回到此节点时得到链表环的长度 length
// 3.P1、P2 回到head节点，让 P1 先走 length 步 ，当P2和P1相遇时即为链表环的起点（此时P1，P2相同速度前进）

// #思路2
// 如何找到链表环的入口结点？要相遇肯定是在环中相遇！如下图：假设，快指针=2慢指针 ；
// 入口结点 和 头结点 之间的距离为 a，入口结点 和 第一次相遇结点 之间的距离为b，链表环中剩下的长度为c，我来推导下两者之间的关系：↓↓↓
// 2(a+b) =a+b+n(b+c) 变化一下-> a=(n-1)(b+c)+c 这个结论是什么意思？
// 如果让快慢指针速度变成相同，然后 慢指针 从头开始走，一定会在 快指针 走了整数圈后 在入口结点相遇，并不是 a 一定等于 c 要看快慢指针相差多少。
// 当n=1 表示 快指针领先1圈，就相遇，那么第一次相遇在相遇点时，慢指针走的长度是a + b，快指针走的长度是a + b + c + b，
// 因为假设的是：快指针每次走两步，因此 2（a + b）=（a + b + c + b），
// 可以推出 a = c ，因此在快慢指针相遇的时候，令快指针再从头开始一步一步的走，慢指针继续走完c ，当两个指针再次相遇的节点就是入口节点。

/* function EntryNodeOfLoop(pHead) {
    if (!pHead || !pHead.next) {
		return null;
	}
	let fast = pHead.next.next,
		slow = pHead.next;
	// 1.获取是否有环，没环退出
	while (fast !== slow) {
		if (fast === null || fast.next === null) {
			return null;
		}
		fast = fast.next.next;
		slow = slow.next;
	}

	// 2.获取环长度
	let cur = slow.next,
		loopLen = 1;
	while (cur !== slow) {
		cur = cur.next;
		loopLen += 1;
	}

	// 让两节点回到头节点，其中一个节点先走环长度步，然后快慢节点相同速度前进，相遇就是头
	fast = slow = pHead;

	while (loopLen-- > 0) {
		fast = fast.next;
	}
	while (fast !== slow) {
		fast = fast.next;
		slow = slow.next;
	}
	return fast;
}
 */

function EntryNodeOfLoop(pHead) {
	if (!pHead || !pHead.next) {
		return null;
	}
	let fast = pHead.next.next,
		slow = pHead.next;
	// 1.获取是否有环，没环退出
	while (fast !== slow) {
		if (fast === null || fast.next === null) {
			return null;
		}
		fast = fast.next.next;
		slow = slow.next;
	}

	// 2.节点相遇，选一个节点回头节点，再次相遇就是入口
	fast = pHead;

	while (fast !== slow) {
		fast = fast.next;
		slow = slow.next;
	}
	return fast;
}
