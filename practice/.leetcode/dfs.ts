/* https://leetcode-cn.com/leetbook/read/path-problems-in-dynamic-programming/r8pzo1/ */
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

  let cache = Array.from(
    {
      length: len,
    },
    () => new Array(fuel + 1).fill(-1)
  );

  /**
   * 计算「路径数量」
   * @param locations 入参 locations
   * @param start 当前所在位置（start 的下标）
   * @param end 目标位置（end 的下标）
   * @param fuel 剩余油量
   * @return 在位置 u 出发，油量为 fuel 的前提下，到达 end 的「路径数量」
   */
  const dfs = (locations, start, end, fuel) => {
    if (cache[start][fuel] !== -1) return cache[start][fuel];
    //油量耗尽，且没到终点
    if (fuel === 0 && start !== end) {
      cache[start][fuel] = 0;
      return 0;
    }

    //是否是最后一步,油量未耗尽的情况下，无法到达任何位置
    let hasNext = false;
    for (let i = 0; i <= len - 1; i++) {
      if (i !== start && fuel >= Math.abs(locations[i] - locations[start])) {
        hasNext = true;
        break;
      }
    }
    if (fuel != 0 && !hasNext) {
      let res = end === start ? 1 : 0;
      cache[start][fuel] = res;
      return res;
    }

    //油量未耗尽情况下，去往各地结果相加；
    let sum = end === start ? 1 : 0;
    for (let i = 0; i <= len - 1; i++) {
      let need = Math.abs(locations[i] - locations[start]);
      if (i != start && fuel >= need) {
        sum += dfs(locations, i, end, fuel - need);
        sum %= mod;
      }
    }
    cache[start][fuel] = sum;
    return sum;
  };

  return dfs(locations, start, finish, fuel);
};

//优化，因为一步不能到终点，多步也不能到终点

//[1,2,3,4,7,5] |a-b|>|b-a|+|c-b|
/**
 * @param {number[]} locations
 * @param {number} start
 * @param {number} finish
 * @param {number} fuel
 * @return {number}
 */
const optimizeCountRoutes = function (locations, start, finish, fuel) {
  let mod = 10 ** 9 + 7;

  let len = locations.length;

  let cache = Array.from(
    {
      length: len,
    },
    () => new Array(fuel + 1).fill(-1)
  );

  /**
   * 计算「路径数量」
   * @param locations 入参 locations
   * @param start 当前所在位置（start 的下标）
   * @param end 目标位置（end 的下标）
   * @param fuel 剩余油量
   * @return 在位置 u 出发，油量为 fuel 的前提下，到达 end 的「路径数量」
   */
  const dfs = (locations, start, end, fuel) => {
    if (cache[start][fuel] !== -1) return cache[start][fuel];

    //如果一步不能到终点，多步也不能到终点，就reuturn吧
    if (fuel < Math.abs(locations[start] - locations[end])) {
      cache[start][fuel] = 0;
      return 0;
    }

    //油量未耗尽情况下，去往各地结果相加；
    let sum = end === start ? 1 : 0;
    for (let i = 0; i <= len - 1; i++) {
      let need = Math.abs(locations[i] - locations[start]);
      if (i != start && fuel >= need) {
        sum += dfs(locations, i, end, fuel - need);
        sum %= mod;
      }
    }
    cache[start][fuel] = sum;
    return sum;
  };

  return dfs(locations, start, finish, fuel);
};
