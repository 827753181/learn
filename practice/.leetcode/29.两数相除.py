#
# @lc app=leetcode.cn id=29 lang=python3
#
# [29] 两数相除
#
# https://leetcode-cn.com/problems/divide-two-integers/description/
#
# algorithms
# Medium (22.14%)
# Likes:    847
# Dislikes: 0
# Total Accepted:    149.2K
# Total Submissions: 673.7K
# Testcase Example:  '10\n3'
#
# 给定两个整数，被除数 dividend 和除数 divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。
#
# 返回被除数 dividend 除以除数 divisor 得到的商。
#
# 整数除法的结果应当截去（truncate）其小数部分，例如：truncate(8.345) = 8 以及 truncate(-2.7335) =
# -2
#
#
#
# 示例 1:
#
# 输入: dividend = 10, divisor = 3
# 输出: 3
# 解释: 10/3 = truncate(3.33333..) = truncate(3) = 3
#
# 示例 2:
#
# 输入: dividend = 7, divisor = -3
# 输出: -2
# 解释: 7/-3 = truncate(-2.33333..) = -2
#
#
#
# 提示：
#
#
# 被除数和除数均为 32 位有符号整数。
# 除数不为 0。
# 假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−2^31,  2^31 − 1]。本题中，如果除法结果溢出，则返回 2^31 − 1。
#
#
#

# @lc code=start
class Solution:
    def divide(self, dividend: int, divisor: int) -> int:
        pass
# @lc code=end


# var divide = function(dividend, divisor) {
#     const MAX_VALUE = 2 ** 31 - 1, MIN_VALUE = -(2 ** 31);
#     // 考虑被除数为最小值的情况
#     if (dividend === MIN_VALUE) {
#         if (divisor === 1) {
#             return MIN_VALUE;
#         }
#         if (divisor === -1) {
#             return MAX_VALUE;
#         }
#     }
#     // 考虑除数为最小值的情况
#     if (divisor === MIN_VALUE) {
#         return dividend === MIN_VALUE ? 1 : 0;
#     }
#     // 考虑被除数为 0 的情况
#     if (dividend === 0) {
#         return 0;
#     }

#     // 一般情况，使用二分查找
#     // 将所有的正数取相反数，这样就只需要考虑一种情况
#     let rev = false;
#     if (dividend > 0) {
#         dividend = -dividend;
#         rev = !rev;
#     }
#     if (divisor > 0) {
#         divisor = -divisor;
#         rev = !rev;
#     }

#     let left = 1, right = MAX_VALUE, ans = 0;
#     while (left <= right) {
#         // 注意溢出，并且不能使用除法
#         const mid = left + ((right - left) >> 1);
#         const check = quickAdd(divisor, mid, dividend);
#         if (check) {
#             ans = mid;
#             // 注意溢出
#             if (mid === MAX_VALUE) {
#                 break;
#             }
#             left = mid + 1;
#         } else {
#             right = mid - 1;
#         }
#     }

#     return rev ? -ans : ans;
# }

# // 快速乘
# const quickAdd = (y, z, x) => {
#     // x 和 y 是负数，z 是正数
#     // 需要判断 z * y >= x 是否成立
#     let result = 0, add = y;
#     while (z !== 0) {
#         if ((z & 1) !== 0) {
#             // 需要保证 result + add >= x
#             if (result < x - add) {
#                 return false;
#             }
#             result += add;
#         }
#         if (z !== 1) {
#             // 需要保证 add + add >= x
#             if (add < x - add) {
#                 return false;
#             }
#             add += add;
#         }
#         // 不能使用除法
#         z >>= 1;
#     }
#     return true;
# };


# var divide = function(dividend, divisor) {
#     const MAX_VALUE = 2 ** 31 - 1, MIN_VALUE = -(2 ** 31);
#     // 考虑被除数为最小值的情况
#     if (dividend === MIN_VALUE) {
#         if (divisor === 1) {
#             return MIN_VALUE;
#         }
#         if (divisor === -1) {
#             return MAX_VALUE;
#         }
#     }
#     // 考虑除数为最小值的情况
#     if (divisor === MIN_VALUE) {
#         return dividend === MIN_VALUE ? 1 : 0;
#     }
#     // 考虑被除数为 0 的情况
#     if (dividend === 0) {
#         return 0;
#     }

#     // 一般情况，使用类二分查找
#     // 将所有的正数取相反数，这样就只需要考虑一种情况
#     let rev = false;
#     if (dividend > 0) {
#         dividend = -dividend;
#         rev = !rev;
#     }
#     if (divisor > 0) {
#         divisor = -divisor;
#         rev = !rev;
#     }

#     const candidates = [divisor];
#     let index = 0;
#     // 注意溢出
#     while (candidates[index] >= dividend - candidates[index]) {
#         candidates.push(candidates[index] + candidates[index]);
#         ++index;
#     }
#     let ans = 0;
#     for (let i = candidates.length - 1; i >= 0; --i) {
#         if (candidates[i] >= dividend) {
#             ans += 1 << i;
#             dividend -= candidates[i];
#         }
#     }

#     return rev ? -ans : ans;
# };
