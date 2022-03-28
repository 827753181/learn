#
# @lc app=leetcode.cn id=61 lang=python3
#
# [61] 旋转链表
#
# https://leetcode-cn.com/problems/rotate-list/description/
#
# algorithms
# Medium (41.75%)
# Likes:    744
# Dislikes: 0
# Total Accepted:    235K
# Total Submissions: 563.4K
# Testcase Example:  '[1,2,3,4,5]\n2'
#
# 给你一个链表的头节点 head ，旋转链表，将链表每个节点向右移动 k 个位置。
# 
# 
# 
# 示例 1：
# 
# 
# 输入：head = [1,2,3,4,5], k = 2
# 输出：[4,5,1,2,3]
# 
# 
# 示例 2：
# 
# 
# 输入：head = [0,1,2], k = 4
# 输出：[2,0,1]
# 
# 
# 
# 
# 提示：
# 
# 
# 链表中节点的数目在范围 [0, 500] 内
# -100 <= Node.val <= 100
# 0 <= k <= 2 * 10^9
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
    def rotateRight(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        pass
# @lc code=end

# class Solution:
#     def rotateRight(self, head: ListNode, k: int) -> ListNode:
#         if k == 0 or not head or not head.next:
#             return head
        
#         n = 1
#         cur = head
#         while cur.next:
#             cur = cur.next
#             n += 1
        
#         if (add := n - k % n) == n:
#             return head
        
#         cur.next = head
#         while add:
#             cur = cur.next
#             add -= 1
        
#         ret = cur.next
#         cur.next = None
#         return ret
