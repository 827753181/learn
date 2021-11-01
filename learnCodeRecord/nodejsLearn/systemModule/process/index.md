child_prcess 的退出时机这块感觉还不是特别熟悉

# 创建多进程时，多进程端口占用冲突解决方案

```
答：使用
parentServer.on('connection',(socket) => {
  childServer.emit('connection',socket);
})


//master.js
const fork = require('child_process').fork;
const cpus = require('os').cpus();
const server = require('http').createServer();
server.listen(3000);

for (let i=0; i<cpus.length; i++) {
    const worker = fork('worker.js');
    worker.send('server', server);
    if (i+1 === cpus.length) {
        server.close(); // 关闭服务器监听，交由子进程处理
    }
}



// worker.js
const http = require('http');
const server = http.createServer((req, res) => {
    res.end('I am worker, pid: ' + process.pid + ', ppid: ' + process.ppid);
});

let worker;
process.on('message', function (message, sendHandle) {
    if (message === 'server') {
        worker = sendHandle;
        worker.on('connection', function(socket) {
            server.emit('connection', socket);
        });
    }
});



```

# 进程间怎么通信

进程间通信无非几种：pipe（管道）、消息队列、信号量、Domain Socket。

# 什么是 IPC 通信，如何建立 IPC 通信？什么场景下需要用到 IPC 通信？

IPC (Inter-process communication) ，即进程间通信技术，由于每个进程创建之后都有自己的独立地址空间，实现 IPC 的目的就是为了进程之间资源共享访问，实现 IPC 的方式有多种：管道、消息队列、信号量、Domain Socket，Node.js 通过 pipe 来实现。

```
// pipe.js
const spawn = require('child_process').spawn;
const child = spawn('node', ['worker.js'])
child.stdout.pipe(process.stdout); // 父子通信管道建立， 将子进程的输出做为当前进程的输入，打印在控制台
console.log(process.pid, child.pid);
```

# Node.js 是单线程还是多线程？进一步会提问为什么是单线程？

Node.js 只能说是主线程是单线程的，因为像 io 操作等一些异步的 api 是在线程池启线程的，
javascript 是单线程的，只有一个事件循环在不停的运行（因为 dom 操作只能是单线程的）

# 多进程或多个 Web 服务之间的状态共享问题？

各个进程相互独立，比如 session 的保存如果保存在服务进程中，4 个工作进程都保存一份的话，这是没必要的，而且服务重启就会丢失，还会出现我在 A 机器上创建了 Session，当负载均衡分发到 B 机器上之后还需要在创建一份。所以一般是通过 redis 或者服务器做数据共享。

# 什么是僵死进程

使用 fork 创建子进程，正常进程退出内核会释放掉进程占用的资源：打开的文件、占用的内存，但是进程的 PID、退出状态、运行时间等会保留，等到父进程调用 wait/waitpid 来获取子进程的状态时，这些资源才释放。
如果子进程退出后父进程没有调用 wait/waitpid 来获取子进程状态，那么进程号会一直被占用，且占用系统资源，称为僵死进程或者僵尸

元凶不是僵尸进程而是其父进程，所以我们把元凶给杀掉之后，僵尸进程会变为孤儿进程被系统的 init 进程 pid = 1 的进程所收养，init 进程会对这些孤儿进程进行管理（调用 wait/waitpid）释放掉其占用的资源。
参考 www.cnblogs.com/Anker/p/3271773.html
