// index.js
import child_process from "child_process";

function startDaemon() {
  const daemon = child_process.spawn("node", ["./daemon.js"], {
    cwd: process.cwd(),
    detached: true,
    stdio: "ignore",
  });
  daemon.on("error", (err) => {
    console.log(err);
  });
  console.log(
    "守护进程开启 父进程 pid: %s, 守护进程 pid: %s",
    process.pid,
    daemon.pid
  );
  daemon.unref();
}

startDaemon();
process.title = "daemon_protect_process";
