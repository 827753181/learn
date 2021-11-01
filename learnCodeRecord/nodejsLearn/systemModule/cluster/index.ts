// 创建一个多进程架构,支持负载均衡技术
import cluster from "cluster";
import http from "http";
import { cpus } from "os";
import process from "process";

// 策略一：一种轮询的策略，默认值
// cluster.schedulingPolicy = cluster.SCHED_RR;

// 策略二：由操作系统调度的策略
// cluster.schedulingPolicy = cluster.SCHED_NONE;

// 或者通过环境变量 NODE_CLUSTER_SCHED_POLICY 设置：
// env NODE_CLUSTER_SCHED_POLICY="none" node app.js // 有效值包括 rr、node

const numCPUs = cpus().length;
console.log("getDown", cluster.isMaster);

if (cluster.isMaster) {
  console.log(`Primary ${process.pid} is running`);

  // 衍生工作进程。
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // 工作进程可以共享任何 TCP 连接
  // 在本示例中，其是 HTTP 服务器
  http
    .createServer((req, res) => {
      res.writeHead(200);
      console.log(`received in ${process.pid}`);
      res.end("hello world\n");
    })
    .listen(8000);

  console.log(`Worker ${process.pid} started`);
}
