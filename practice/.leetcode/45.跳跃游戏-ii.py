#
# @lc app=leetcode.cn id=45 lang=python3
#
# [45] 跳跃游戏 II
#
# https://leetcode-cn.com/problems/jump-game-ii/description/
#
# algorithms
# Medium (44.01%)
# Likes:    1452
# Dislikes: 0
# Total Accepted:    280.3K
# Total Submissions: 635.8K
# Testcase Example:  '[2,3,1,1,4]'
#
# 给你一个非负整数数组 nums ，你最初位于数组的第一个位置。
#
# 数组中的每个元素代表你在该位置可以跳跃的最大长度。
#
# 你的目标是使用最少的跳跃次数到达数组的最后一个位置。
#
# 假设你总是可以到达数组的最后一个位置。
#
#
#
# 示例 1:
#
#
# 输入: nums = [2,3,1,1,4]
# 输出: 2
# 解释: 跳到最后一个位置的最小跳跃数是 2。
# 从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
#
#
# 示例 2:
#
#
# 输入: nums = [2,3,0,1,4]
# 输出: 2
#
#
#
#
# 提示:
#
#
# 1
# 0
#
#
#

# @lc code=start
from xmlrpc.client import MAXINT


class Solution:
    def jump(self, nums: List[int]) -> int:
        # end,maxPos,step = 0,0,0
        # for i in range(0,len(nums)):
        position = len(nums)-1
        steps = 0
        while position > 0:
            for i in range(0, position):
                if nums[i]+i >= position:
                    position = i
                    steps += 1
                    break
        return steps
        # minJump = MAXINT

        # def dfs(index, jumpStep):
        #     if index >= len(nums)-1:
        #         nonlocal minJump
        #         if jumpStep < minJump:
        #             minJump = jumpStep
        #         return
        #     size = nums[index]+1
        #     if index+size > len(nums):
        #         size = len(nums) - index
        #     for i in range(1, size):
        #         dfs(index+i, jumpStep+1)
        # dfs(0, 0)
        # return minJump
# @lc code=end


# class Solution {
#     public int jump(int[] nums) {
#         int position = nums.length - 1;
#         int steps = 0;
#         while (position > 0) {
#             for (int i = 0; i < position; i++) {
#                 if (i + nums[i] >= position) {
#                     position = i;
#                     steps++;
#                     break;
#                 }
#             }
#         }
#         return steps;
#     }
# }


# 方法一虽然直观，但是时间复杂度比较高，有没有办法降低时间复杂度呢？
# 如果我们「贪心」地进行正向查找，每次找到可到达的最远位置，就可以在线性时间内得到最少的跳跃次数。
# 例如，对于数组 [2,3,1,2,4,2,3]，初始位置是下标 0，从下标 0 出发，最远可到达下标 2。下标 0 可到达的位置中，下标 1 的值是 3，从下标 1 出发可以达到更远的位置，因此第一步到达下标 1。
# 从下标 1 出发，最远可到达下标 4。下标 1 可到达的位置中，下标 4 的值是 4 ，从下标 4 出发可以达到更远的位置，因此第二步到达下标 4。
# 在具体的实现中，我们维护当前能够到达的最大下标位置，记为边界。我们从左到右遍历数组，到达边界时，更新边界并将跳跃次数增加 1。
# 在遍历数组时，我们不访问最后一个元素，这是因为在访问最后一个元素之前，我们的边界一定大于等于最后一个位置，否则就无法跳到最后一个位置了。如果访问最后一个元素，在边界正好为最后一个位置的情况下，我们会增加一次「不必要的跳跃次数」，因此我们不必访问最后一个元素。
# class Solution:
#     def jump(self, nums: List[int]) -> int:
#         n = len(nums)
#         maxPos, end, step = 0, 0, 0
#         for i in range(n - 1):
#             if maxPos >= i:
#                 maxPos = max(maxPos, i + nums[i])
#                 if i == end:
#                     end = maxPos
#                     step += 1
#         return step
