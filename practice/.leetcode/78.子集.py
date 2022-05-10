#
# @lc app=leetcode.cn id=78 lang=python3
#
# [78] 子集
#
# https://leetcode-cn.com/problems/subsets/description/
#
# algorithms
# Medium (80.38%)
# Likes:    1570
# Dislikes: 0
# Total Accepted:    416K
# Total Submissions: 517.2K
# Testcase Example:  '[1,2,3]'
#
# 给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。
# 
# 解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。
# 
# 
# 
# 示例 1：
# 
# 
# 输入：nums = [1,2,3]
# 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
# 
# 
# 示例 2：
# 
# 
# 输入：nums = [0]
# 输出：[[],[0]]
# 
# 
# 
# 
# 提示：
# 
# 
# 1 
# -10 
# nums 中的所有元素 互不相同
# 
# 
#

# @lc code=start
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        pass
# @lc code=end

# var subsets = function(nums) {
#     const ans = [];
#     const n = nums.length;
#     for (let mask = 0; mask < (1 << n); ++mask) {
#         const t = [];
#         for (let i = 0; i < n; ++i) {
#             if (mask & (1 << i)) {
#                 t.push(nums[i]);
#             }
#         }
#         ans.push(t);
#     }
#     return ans;
# };


# var subsets = function(nums) {
#     const t = [];
#     const ans = [];
#     const n = nums.length;
#     const dfs = (cur) => {
#         if (cur === nums.length) {
#             ans.push(t.slice());
#             return;
#         }
#         t.push(nums[cur]);
#         dfs(cur + 1, nums);
#         t.pop(t.length - 1);
#         dfs(cur + 1, nums);
#     }
#     dfs(0, nums);
#     return ans;
# };
