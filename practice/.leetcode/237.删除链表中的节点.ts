/*
 * @lc app=leetcode.cn id=237 lang=typescript
 *
 * [237] 删除链表中的节点
 *
 * https://leetcode.cn/problems/delete-node-in-a-linked-list/description/
 *
 * algorithms
 * Easy (85.91%)
 * Likes:    1156
 * Dislikes: 0
 * Total Accepted:    299.7K
 * Total Submissions: 348.7K
 * Testcase Example:  '[4,5,1,9]\n5'
 *
 * 请编写一个函数，用于 删除单链表中某个特定节点 。在设计函数时需要注意，你无法访问链表的头节点 head ，只能直接访问 要被删除的节点 。
 *
 * 题目数据保证需要删除的节点 不是末尾节点 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：head = [4,5,1,9], node = 5
 * 输出：[4,1,9]
 * 解释：指定链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9
 *
 *
 * 示例 2：
 *
 *
 * 输入：head = [4,5,1,9], node = 1
 * 输出：[4,5,9]
 * 解释：指定链表中值为 1 的第三个节点，那么在调用了你的函数之后，该链表应变为 4 -> 5 -> 9
 *
 *
 *
 * 提示：
 *
 *
 * 链表中节点的数目范围是 [2, 1000]
 * -1000 <= Node.val <= 1000
 * 链表中每个节点的值都是 唯一 的
 * 需要删除的节点 node 是 链表中的节点 ，且 不是末尾节点
 *
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

/**
 Do not return anything, modify it in-place instead.
 */
function deleteNode(root: ListNode | null): void {
	if (!root) {
		return;
	} else if (root.next) {
		root.val = root.next.val;
		root.next = root.next.next;
		return;
	} 
}
// @lc code=end
