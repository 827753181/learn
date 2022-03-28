#
# @lc app=leetcode.cn id=47 lang=python3
#
# [47] 全排列 II
#
# https://leetcode-cn.com/problems/permutations-ii/description/
#
# algorithms
# Medium (64.31%)
# Likes:    989
# Dislikes: 0
# Total Accepted:    286.6K
# Total Submissions: 444.8K
# Testcase Example:  '[1,1,2]'
#
# 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。
# 
# 
# 
# 示例 1：
# 
# 
# 输入：nums = [1,1,2]
# 输出：
# [[1,1,2],
# ⁠[1,2,1],
# ⁠[2,1,1]]
# 
# 
# 示例 2：
# 
# 
# 输入：nums = [1,2,3]
# 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
# 
# 
# 
# 
# 提示：
# 
# 
# 1 <= nums.length <= 8
# -10 <= nums[i] <= 10
# 
# 
#

# @lc code=start
class Solution:
    def permuteUnique(self, nums: List[int]) -> List[List[int]]:
# @lc code=end




# var permuteUnique = function(nums) {
#     const ans = [];
#     const vis = new Array(nums.length).fill(false);
#     const backtrack = (idx, perm) => {
#         if (idx === nums.length) {
#             ans.push(perm.slice());
#             return;
#         }
#         for (let i = 0; i < nums.length; ++i) {
#             if (vis[i] || (i > 0 && nums[i] === nums[i - 1] && !vis[i - 1])) {
#                 continue;
#             }
#             perm.push(nums[i]);
#             vis[i] = true;
#             backtrack(idx + 1, perm);
#             vis[i] = false;
#             perm.pop();
#         }
#     }
#     nums.sort((x, y) => x - y);
#     backtrack(0, []);
#     return ans;
# };
