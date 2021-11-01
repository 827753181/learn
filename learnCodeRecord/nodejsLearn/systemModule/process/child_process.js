const child_process = require("child_process");
const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url);
  try {
    if (req.url === "/compute") {
      const fork_process = child_process.fork("./child_process_compute.js");
      // 当一个子进程使用 process.send() 发送消息时会触发 'message' 事件
      fork_process.on("message", (msg) => {
        console.log("forkOnMessage", msg);
        res.end(`Sum is ${msg}`);
        fork_process.kill();
      });
      // 子进程监听到一些错误消息退出
      fork_process.on("close", (code, signal) => {
        console.log(
          `收到close事件，子进程收到信号 ${signal} 而终止，退出码 ${code}`
        );
        fork_process.kill();
      });

      fork_process.send("收到请求");
    } else {
      res.end("ok");
    }
  } catch (err) {
    console.error("error");
  }
});

server.listen(3002, "127.0.0.1");

process.title = "node_child_process";
