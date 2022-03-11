#
# @lc app=leetcode.cn id=24 lang=python3
#
# [24] 两两交换链表中的节点
#
# https://leetcode-cn.com/problems/swap-nodes-in-pairs/description/
#
# algorithms
# Medium (70.64%)
# Likes:    1256
# Dislikes: 0
# Total Accepted:    386.4K
# Total Submissions: 547K
# Testcase Example:  '[1,2,3,4]'
#
# 给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。
#
#
#
# 示例 1：
#
#
# 输入：head = [1,2,3,4]
# 输出：[2,1,4,3]
#
#
# 示例 2：
#
#
# 输入：head = []
# 输出：[]
#
#
# 示例 3：
#
#
# 输入：head = [1]
# 输出：[1]
#
#
#
#
# 提示：
#
#
# 链表中节点的数目在范围 [0, 100] 内
# 0 <= Node.val <= 100
#
#
#

# @lc code=start
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def swapPairs(self, head: ListNode) -> ListNode:
        if not head or not head.next:
            return head
        newHead = head.next
        # 从后面往前面交换
        head.next = self.swapPairs(newHead.next)
        # 先交换后面的
        newHead.next = head
        return newHead
# @lc code=end


# var swapPairs = function(head) {
#     if (head === null|| head.next === null) {
#         return head;
#     }
#     const newHead = head.next;
#     head.next = swapPairs(newHead.next);
#     newHead.next = head;
#     return newHead;
# };

# class Solution:
#     def swapPairs(self, head: ListNode) -> ListNode:
#         if not head or not head.next:
#             return head
#         newHead = head.next
#         head.next = self.swapPairs(newHead.next)
#         newHead.next = head
#         return newHead


# var swapPairs = function(head) {
#     const dummyHead = new ListNode(0);
#     dummyHead.next = head;
#     let temp = dummyHead;
#     while (temp.next !== null && temp.next.next !== null) {
#         const node1 = temp.next;
#         const node2 = temp.next.next;
#         temp.next = node2;
#         node1.next = node2.next;
#         node2.next = node1;
#         temp = node1;
#     }
#     return dummyHead.next;
# };
