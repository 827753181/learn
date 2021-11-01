import http from "http";
const child_server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plan",
  });
  if (req.url === "/error") {
    res.end("I am error worker, pid: " + process.pid + ", ppid: " + process.ppid);
    throw new Error("worker process exception!"); // 测试异常进程退出、重建

  }else{
    res.end("I am worker, pid: " + process.pid + ", ppid: " + process.ppid);

  }
});
process.title = "node-worker";
let serverWorker: http.Server;
process.on("message", (msg, server: http.Server) => {
  if (msg === "server") {
    serverWorker = server;
    serverWorker.on("connection", (socket) => {
      child_server.emit("connection", socket);
    });
  }
});

process.on("uncaughtException", (error) => {
  console.log("error", error);
  process.send && process.send({ msg: "uncaughtError", error });

  serverWorker.close(function() {
    process.exit(1);
  });
});

console.log(22222)