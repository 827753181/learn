# node.js console 是同步的还是异步的?

console 既不是总是同步的，也不总是异步的。是否为同步取决于链接的是什么流以及操作系统是 Windows 还是 POSIX:

**注意:**  
同步写将会阻塞事件循环直到写完成。 有时可能一瞬间就能写到一个文件，但当系统处于高负载时，管道的接收端可能不会被读取、缓慢的终端或文件系统，因为事件循环被阻塞的足够频繁且足够长的时间，这些可能会给系统性能带来消极的影响。当你向一个交互终端会话写时这可能不是个问题，但当生产日志到进程的输出流时要特别留心。

文件(Files): Windows 和 POSIX 平台下都是同步

终端(TTYs): 在 Windows 平台下同步，在 POSIX 平台下异步

管道(Pipes): 在 Windows 平台下同步，在 POSIX 平台下异步

# 如何实现一个 console.log?

process.stdout.write('hello world!'+'\n');

# 为什么 console.log 执行完就退出

EventLoop 的执行机制中产生事件循环会导致一个 while（true）的死循环，例如定时器 setInterval  
但是 console.log 它没有产生 watch、handlers 在事件循环中执行了一次就退出了。
