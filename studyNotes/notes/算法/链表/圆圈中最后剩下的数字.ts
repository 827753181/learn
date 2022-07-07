// # 题目
// 0,1,...,n-1这n个数字排成一个圆圈，从数字0开始，每次从这个圆圈里删除第m个数字。求出这个圆圈里剩下的最后一个数字。

// 其实这就是著名的约瑟夫环问题，下面是这个问题产生的背景，一个有趣的故事：
// 据说著名犹太历史学家 Josephus有过以下的故事：
// 在罗马人占领乔塔帕特后，39 个犹太人与Josephus及他的朋友躲到一个洞中，
// 39个犹太人决定宁愿死也不要被敌人抓到，于是决定了一个自杀方式，
// 41个人排成一个圆圈，由第1个人开始报数，
// 每报数到第3人该人就必须自杀，然后再由下一个重新报数，
// 直到所有人都自杀身亡为止。
// 然而Josephus 和他的朋友并不想遵从。
// 首先从一个人开始，越过k-2个人（因为第一个人已经被越过），
// 并杀掉第k个人。接着，再越过k-1个人，并杀掉第k个人。
// 这个过程沿着圆圈一直进行，直到最终只剩下一个人留下，
// 这个人就可以继续活着。问题是，给定了和，
// 一开始要站在什么地方才能避免被处决？
// Josephus要他的朋友先假装遵从，他将朋友与自己安排在第16个与第31个位置，于是逃过了这场死亡游戏。
// 思路
// 解法1:用链表模拟环
// 用链表模拟一个环
// 模拟游戏场景
// 记录头节点的前一个节点current，以保证我们找到的要删除的节点是current.next
// 每次循环m次找到目标节点删除，直到链表只剩下一个节点
// 时间复杂度O(m*n) 空间复杂度O(n)

// 解法2:用数组模拟
// 每次计算下标，需要考虑末尾条件

// 解法3:数学推导
// f(n) = (f(n-1)+m)%n 即 f(n,m) = (f(n-1,m)+m)%n
// 使用递归求解 边界条件为 n=1
// 时间复杂度 1>2>3
// 易理解程度 1>2>3
// 具体理解推倒可看https://juejin.cn/post/7031552757450571813
// f(n,m) = f^(n-1,m)(删除掉一个元素的东西)
// 第一个删除的元素，从0开始计算，会是(m-1)%n，计为k
// 则第二次删除开始时，元素排列为
// f(n-1,m) = 0 1 2 ... n-2
// f^(n-1,m) = k+1,k+2...n-1 0 1 2 3 k-1
// f(n,m) = f^(n-1,m) = (f(n-1,m)+k+1)%n = (f(n-1,m)+(m-1)%n+1)%n=(f(n-1)+m)%n
// 当n=1时，数组中只有一个数字0，因此有f(1,m)=0，由此我们可以得出递推表达式：
// f(n,m)={ 
//     0，n=1
//     (f(n−1,m)+m))%n≥0
// ​}
    
/*class ListNode {
	val: number;
	next: ListNode | null;
	constructor(val: number, next?: ListNode) {
		this.val = val;
		this.next = next;
	}
}
 function LastRemaining_Solution(n, m) {
	// 鲁棒
	if (n === 0 || m === 0) return -1;

	// 生成环链
	let head = new ListNode(0);
	let cur = head;
	for (let i = 1; i < n; i++) {
		cur.next = new ListNode(i);
	}
	cur.next = head;

	// 每循环m次删掉一个，直到只剩一个
	while (head.next != head) {
		for (let i = 0; i < m - 1; i++) {
			head = head.next;
		}
		head.next = head.next.next;
	}
	return head.val;
}
 */
/* function LastRemaining_Solution(n, m) {
	// 鲁棒
	if (n === 0 || m === 0) return -1;

	// 生成数组
	let arr = [];
	for (let i = 1; i < n; i++) {
		arr.push(i);
	}
	let idx = 0;
	// 每循环m次删掉一个，直到只剩一个
	while (arr.length > 1) {
		idx = ((idx + m) % arr.length) - 1;
		if (idx >= 0) arr.splice(idx, 1);
		else {
			arr.splice(arr.length - 1, 1);
			idx = 0;
		}
	}
    return arr[0]
} */

function loopRemain_solution(n, m) {
	// 鲁棒
	if (n === 1) return 0;
	return (loopRemain_solution(n - 1, m) + m) % n;
}

function LastRemaining_Solution(n, m) {
	// 鲁棒
	if (n === 0 || m === 0) return -1;
	else return loopRemain_solution(n, m);
}
