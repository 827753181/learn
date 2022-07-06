/*
 * @lc app=leetcode.cn id=19 lang=typescript
 *
 * [19] 删除链表的倒数第 N 个结点
 *
 * https://leetcode.cn/problems/remove-nth-node-from-end-of-list/description/
 *
 * algorithms
 * Medium (44.20%)
 * Likes:    2108
 * Dislikes: 0
 * Total Accepted:    835.1K
 * Total Submissions: 1.9M
 * Testcase Example:  '[1,2,3,4,5]\n2'
 *
 * 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：head = [1,2,3,4,5], n = 2
 * 输出：[1,2,3,5]
 *
 *
 * 示例 2：
 *
 *
 * 输入：head = [1], n = 1
 * 输出：[]
 *
 *
 * 示例 3：
 *
 *
 * 输入：head = [1,2], n = 1
 * 输出：[1]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 链表中结点的数目为 sz
 * 1 <= sz <= 30
 * 0 <= Node.val <= 100
 * 1 <= n <= sz
 *
 *
 *
 *
 * 进阶：你能尝试使用一趟扫描实现吗？
 *
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
	if (head == null || n == 0) return head;
    /* let headS = new ListNode(null,head)
    let cur = head;
	let pre = headS;
	while (cur) {
		cur = cur.next;
		if (n > 0) {
			n -= 1;
		} else {
            pre = pre.next;
		}
	}
    let temp = pre.next;
    pre.next = temp.next;
    temp.next = null;
	return headS.next;
 */


	if (head == null || n == 0) return;
	let front = head;
	let behind = head;
    let prev = null;
	let index = 1;

	while (front.next) {
		front = front.next;
		index += 1;
		if (index > n) {
            prev = behind
			behind = behind.next;
		}
	}
	return (n <= index) && behind;
}
// @lc code=end
