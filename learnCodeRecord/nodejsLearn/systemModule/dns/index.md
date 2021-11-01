# dns.lookup()和 dns.resolve()的不同

> dns.lookup()和 dns.resolve() 是同步的还是异步的？

- dns.lookup()是以异步 JavaScript 的角度来调用的，但在内部 libuv 底层线程池中却是同步的调用 getaddrinfo(3)，所以可能会由于一些不确定因素造成 Node 进程阻塞。

- dns.resolve() 始终是保持异步不会对其它进程产生负面影响,因为这个方法没有使用 getaddrinfo(3)，是通过网络执行的 DNS 查询，。

# 什么是 dns 解析过程，什么是 dns 本地解析

当我们访问一个域名时，会有一个 dns 域名解析系统将我们的域名解析为 IP，过程大概是  
浏览器 DNS 缓存 -> 系统 os 缓存 -> 路由器缓存 -> ISP DNS 缓存
DNS 本地解析特指的 系统（OS）缓存 这一阶段，在浏览器 DNS 缓存未命中的情况下，会从本地系统的一个 hosts 文件寻找对应 IP。
