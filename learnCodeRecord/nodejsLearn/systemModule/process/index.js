// javascript是单线程的，但是nodejs不一定是单线程的，虽然他的主线程是“单线程”，但是异步I/O，文件读取这些异步操作都是在线程池运行的。
// node将所有的阻塞操作都交给了内部的线程池去实现，本身只负责不断的往返调度，并没有进行真正的I/O操作，从而实现异步非阻塞I/O。

/* 
  child_process.spawn()：适用于大量数据，例图像处理，二进制数据处理。
  child_process.exec()：适用于小量数据，maxBuffer 默认值为 200 * 1024 超出这个默认值将会导致程序崩溃，数据量过大可采用 spawn。
  child_process.execFile()：类似 child_process.exec()，区别是不能通过 shell 来执行，不支持像 I/O 重定向和文件查找这样的行为
  child_process.fork()： 衍生新的进程，进程之间是相互独立的，每个进程都有自己的 V8 实例、内存，系统资源是有限的，不建议衍生太多的子进程出来，最好根据系统 CPU 核心数设置。
*/
const child_proces = require("child_process");

const spawn_child = child_proces.spawn("ls", ["-l"], {
  cwd: "../",
});
spawn_child.stdout.pipe(process.stdout);

const exec_child = child_proces.exec("node -v", (err, stdout, stderr) => {
  console.log("exec", { err, stdout, stderr });
});
exec_child.stdout.pipe(process.stdout);

const exec_file_child = child_proces.execFile(
  `node`,
  ["-v"],
  (error, stdout, stderr) => {
    console.log("execFile", { error, stdout, stderr });
    // { error: null, stdout: 'v8.5.0\n', stderr: '' }
  }
);
exec_file_child.stdout.pipe(process.stdout);

// 这里子进程跑了listen之后，如果主进程在命令行按ctrl+c退出，或者用process.exit退出，则子进程不会退出
const fork_child = child_proces.fork("./child_process.js");

process.title = "node_index";
