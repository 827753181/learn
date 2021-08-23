/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  let dp = new Array(m).fill(1).map((ele) => new Array(n).fill(0));
  dp[0][0] = 1;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i > 0 && j > 0) {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      } else if (i > 0) {
        dp[i][j] = dp[i - 1][j];
      } else if (j > 0) {
        dp[i][j] = dp[i][j - 1];
      }
    }
  }
  return dp[m - 1][n - 1];
};

/* https://leetcode-cn.com/leetbook/read/path-problems-in-dynamic-programming/r82ix6/ */
/**
 * @param {number[]} locations
 * @param {number} start
 * @param {number} finish
 * @param {number} fuel
 * @return {number}
 */
const countRoutes = function (locations, start, finish, fuel) {
  let mod = 10 ** 9 + 7;

  let len = locations.length;

  let dp = Array.from(
    {
      length: len,
    },
    () => new Array(fuel + 1).fill(0)
  );

  for (let i = 0; i <= len - 1; i++) {
    for (let j = 1; j <= i; j++) {
      let need = Math.abs(locations[i] - locations[j]);
      dp[i][fuel] = dp[i][fuel] + dp[i - j][fuel - need] + (1 % mod);
    }
  }

  return dp[start][fuel];
};
