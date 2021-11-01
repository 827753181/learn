import child_process from "child_process";
import http from "http";
import os from "os";
let server = http.createServer((req) => {});
server.listen(3003);

let workers = {} as { [key: string]: child_process.ChildProcess };

function createWorker() {
  const fork_process = child_process.fork("./child_master");
  fork_process.send("server", server);
  fork_process.on("message", ({ msg, error }) => {
    if (msg === "uncaughtError") {
      console.log("uncaughtError", error);
      fork_process.kill();
      delete workers[fork_process.pid];
      createWorker();
    }
  });
  fork_process.on("exit", () => {
    delete workers[fork_process.pid];
  });
  fork_process.on("error", () => {
    console.log(`a error work is killed`, fork_process.pid);
    fork_process.kill();
    delete workers[fork_process.pid];
    createWorker();
  });

  workers[fork_process.pid] = fork_process;

  console.log(`fork_process running in ${fork_process.pid}`);
}

function close(code: any) {
  console.log("进程退出！", code);
  if (code !== 0) {
    for (let key in workers) {
      console.log("master process exited, kill worker pid: ", workers[key].pid);
      workers[key].kill();
    }
  }
  process.exit(0);
}

process.title = "node-master";
process.on("SIGINT", close);
process.on("exit", close);
process.on("SIGQUIT", close);
process.on("SIGTERM", close);

// for (let i = 0; i < os.cpus().length; i++) {
createWorker();
// }
