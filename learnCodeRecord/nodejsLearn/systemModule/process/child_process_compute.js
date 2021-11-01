function compute(j) {
  let sum = 0;
  console.info("计算开始");
  console.time("计算耗时");
  for (let i = 0; i < Math.pow(10, j); i++) {
    sum += i;
  }
  console.timeEnd("计算耗时");

  console.info("计算结束");
  return sum;
}

process.on("message", (msg) => {
  console.log(msg, "process.pid", process.pid); // 子进程id
  const sum = compute(13);

  // 如果Node.js进程是通过进程间通信产生的，那么，process.send()方法可以用来给父进程发送消息
  process.send(sum);
});

process.title = "node_child_process_compute";
