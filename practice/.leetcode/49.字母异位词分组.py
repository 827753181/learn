#
# @lc app=leetcode.cn id=49 lang=python3
#
# [49] 字母异位词分组
#
# https://leetcode-cn.com/problems/group-anagrams/description/
#
# algorithms
# Medium (66.97%)
# Likes:    1071
# Dislikes: 0
# Total Accepted:    299.2K
# Total Submissions: 446.2K
# Testcase Example:  '["eat","tea","tan","ate","nat","bat"]'
#
# 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。
# 
# 字母异位词 是由重新排列源单词的字母得到的一个新单词，所有源单词中的字母通常恰好只用一次。
# 
# 
# 
# 示例 1:
# 
# 
# 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
# 输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
# 
# 示例 2:
# 
# 
# 输入: strs = [""]
# 输出: [[""]]
# 
# 
# 示例 3:
# 
# 
# 输入: strs = ["a"]
# 输出: [["a"]]
# 
# 
# 
# 提示：
# 
# 
# 1 <= strs.length <= 10^4
# 0 <= strs[i].length <= 100
# strs[i] 仅包含小写字母
# 
# 
#

# @lc code=start
class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        pass
# @lc code=end




# var groupAnagrams = function(strs) {
#     const map = new Map();
#     for (let str of strs) {
#         let array = Array.from(str);
#         array.sort();
#         let key = array.toString();
#         let list = map.get(key) ? map.get(key) : new Array();
#         list.push(str);
#         map.set(key, list);
#     }
#     return Array.from(map.values());
# };


# var groupAnagrams = function(strs) {
#     const map = new Object();
#     for (let s of strs) {
#         const count = new Array(26).fill(0);
#         for (let c of s) {
#             count[c.charCodeAt() - 'a'.charCodeAt()]++;
#         }
#         map[count] ? map[count].push(s) : map[count] = [s];
#     }
#     return Object.values(map);
# };
