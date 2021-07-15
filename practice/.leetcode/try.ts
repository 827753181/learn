// 56 - II. 数组中数字出现的次数 II
// 在一个数组 nums 中除一个数字只出现一次之外，其他数字都出现了4次。请找出那个只出现一次的数字。

//此处是4次及任意x（X<4）次的推理过程，如果X要大于4，多引入一位
function singleNumber(nums) {
  let ones = 0,
    twos = 0;
  nums.forEach((ele) => {
    //4次推理过程
    // 00 0 00
    // 10 0 10
    // 00 1 01
    // 10 1 11
    // 11 0 11
    // 01 0 01
    // 01 1 10
    // 11 1 00
    
    // if one == 0:
      // if n == 0:
        // two = two
      // if n == 1:
        // two = ~two
    // if one == 1:
      // two = 0
    //if one == 0:
    //  two =two;
    //if one == 1:
    //  two=  n^two



    // two = (one & n) ^ two
    //  one = one ^n

    twos = (ones & ele) ^ twos;
    ones = ones ^ ele;
  });
  console.log(ones, twos);

  // return ones ^ twos & ones;//如果只拦截一次,就先01，10异或出1次和两次的结果，再&01并出一次的结果
  return ones;
}




var maxSlidingWindow = function(nums, k) {
  const n = nums.length;
  const q = [];
  for (let i = 0; i < k; i++) {
      while (q.length && nums[i] >= nums[q[q.length - 1]]) {
          q.pop();
      }
      q.push(i);
  }

  const ans = [nums[q[0]]];
  for (let i = k; i < n; i++) {
      while (q.length && nums[i] >= nums[q[q.length - 1]]) {
          q.pop();
      }
      q.push(i);
      while (q[0] <= i - k) {
          q.shift();
      }
      ans.push(nums[q[0]]);
  }
  return ans;
};
var maxSlidingWindow = function(nums, k) {
  let n = nums.length;
  let q = [];
  for(let i =0;i<k;i++){
    while(q.length && nums[i]>=nums[q[q.length-1]]){
      q.pop();
    }
    q.push(i);
  }
  let ans = [nums[q[0]]];
  for(let i = k;i<n;i++){
    while(q.length && nums[i]>=nums[q[q.length-1]]){
      q.pop();
    }
    q.push(i);
    //最大值不在范围内
    while(q[0]<=i-k){
      q.shift()
    }
    ans.push(nums[q[0]]);

  }
  return ans
};