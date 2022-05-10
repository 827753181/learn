#
# @lc app=leetcode.cn id=77 lang=python3
#
# [77] 组合
#
# https://leetcode-cn.com/problems/combinations/description/
#
# algorithms
# Medium (77.01%)
# Likes:    931
# Dislikes: 0
# Total Accepted:    321.6K
# Total Submissions: 417.5K
# Testcase Example:  '4\n2'
#
# 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
#
# 你可以按 任何顺序 返回答案。
#
#
#
# 示例 1：
#
#
# 输入：n = 4, k = 2
# 输出：
# [
# ⁠ [2,4],
# ⁠ [3,4],
# ⁠ [2,3],
# ⁠ [1,2],
# ⁠ [1,3],
# ⁠ [1,4],
# ]
#
# 示例 2：
#
#
# 输入：n = 1, k = 1
# 输出：[[1]]
#
#
#
# 提示：
#
#
# 1
# 1
#
#
#

# @lc code=start
class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        if k == 0:
            return [[]]
        res = []
        for i in range(k, n+1):
            for pre in self.combine(i-1, k-1):
                res += [pre + [i]]
        return res
# @lc code=end
# var combine = function(n, k) {
#     const ans = [];
#     const dfs = (cur, n, k, temp) => {
#         // 剪枝：temp 长度加上区间 [cur, n] 的长度小于 k，不可能构造出长度为 k 的 temp
#         if (temp.length + (n - cur + 1) < k) {
#             return;
#         }
#         // 记录合法的答案
#         if (temp.length == k) {
#             ans.push(temp);
#             return;
#         }
#         // 考虑选择当前位置
#         dfs(cur + 1, n, k, [...temp, cur]);
#         // 考虑不选择当前位置
#         dfs(cur + 1, n, k, temp);
#     }
#     dfs(1, n, k, []);
#     return ans;
# };
