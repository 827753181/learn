#
# @lc app=leetcode.cn id=99 lang=python3
#
# [99] 恢复二叉搜索树
#
# https://leetcode-cn.com/problems/recover-binary-search-tree/description/
#
# algorithms
# Medium (60.59%)
# Likes:    694
# Dislikes: 0
# Total Accepted:    95.3K
# Total Submissions: 157.5K
# Testcase Example:  '[1,3,null,null,2]'
#
# 给你二叉搜索树的根节点 root ，该树中的 恰好 两个节点的值被错误地交换。请在不改变其结构的情况下，恢复这棵树 。
#
#
#
# 示例 1：
#
#
# 输入：root = [1,3,null,null,2]
# 输出：[3,1,null,null,2]
# 解释：3 不能是 1 的左孩子，因为 3 > 1 。交换 1 和 3 使二叉搜索树有效。
#
#
# 示例 2：
#
#
# 输入：root = [3,1,4,null,null,2]
# 输出：[2,1,4,null,null,3]
# 解释：2 不能在 3 的右子树中，因为 2 < 3 。交换 2 和 3 使二叉搜索树有效。
#
#
#
# 提示：
#
#
# 树上节点的数目在范围 [2, 1000] 内
# -2^31 <= Node.val <= 2^31 - 1
#
#
#
#
# 进阶：使用 O(n) 空间复杂度的解法很容易实现。你能想出一个只使用 O(1) 空间的解决方案吗？
#
#

# @lc code=start
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def inorder(self, root, output):
        if root == None:
            return
        self.inorder(root.left, output)
        output.append(root.val)
        self.inorder(root.right, output)

    def getSwappedValue(self, output):
        index1, index2 = -1, -1
        for i in range(0, len(output)):
            if output[i] < output[i-1]:
                index2 = i
                # 暂定i-1和i互换，如果其他情况，会再进这个if
                # 那种情况，更新index2
                if index1 == -1:
                    index1 = i-1
                else:
                    break
        return [output[index1], output[index2]]

    def reverseSwapperInTree(self, root, x, y, count):
        if root == None or root.val == None:
            return
        if root.val == x or root.val == y:
            root.val = x if root.val == y else y
            count -= 1
            if count == 0:
                return
        self.reverseSwapperInTree(root.left, x, y, count)
        self.reverseSwapperInTree(root.right, x, y, count)
        return

    def recoverTree(self, root: Optional[TreeNode]) -> None:
        output = []
        self.inorder(root, output)
        [x, y] = self.getSwappedValue(output)
        self.reverseSwapperInTree(root, x, y, 2)
        """
        Do not return anything, modify root in-place instead.
        """
# @lc code=end

# 代码

# const inorder = (root, nums) => {
#     if (root === null) {
#         return;
#     }
#     inorder(root.left, nums);
#     nums.push(root.val);
#     inorder(root.right, nums);
# }

# const findTwoSwapped = (nums) => {
#     const n = nums.length;
#     let index1 = -1, index2 = -1;
#     for (let i = 0; i < n - 1; ++i) {
#         if (nums[i + 1] < nums[i]) {
#             index2 = i + 1;
#             if (index1 === -1) {
#                 index1 = i;
#             } else {
#                 break;
#             }
#         }
#     }
#     let x = nums[index1], y = nums[index2];
#     return [x, y];
# }

# const recover = (r, count, x, y) => {
#     if (r !== null) {
#         if (r.val === x || r.val === y) {
#             r.val = r.val === x ? y : x;
#             if (--count === 0) {
#                 return;
#             }
#         }
#         recover(r.left, count, x, y);
#         recover(r.right, count, x, y);
#     }
# }

# var recoverTree = function(root) {
#     const nums = [];
#     inorder(root, nums);
#     const [first, second] = findTwoSwapped(nums);
#     recover(root, 2, first, second);
# };
# 复杂度分析

# 时间复杂度：O(N)O(N)，其中 NN 为二叉搜索树的节点数。中序遍历需要 O(N)O(N) 的时间，判断两个交换节点在最好的情况下是 O(1)O(1)，在最坏的情况下是 O(N)O(N)，因此总时间复杂度为 O(N)O(N)。
# 空间复杂度：O(N)O(N)。我们需要用 \textit{nums}nums 数组存储树的中序遍历列表。
