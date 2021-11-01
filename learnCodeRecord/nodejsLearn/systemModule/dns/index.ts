import dns from "dns";

dns.lookup("www.baidu.com", (err, adress, family) => {
  console.log("lookup", err, adress, family);
});

dns.resolve("www.baidu.com", (err, adress) => {
  console.log("resolved", err, adress); //resolve会真实链接到实际的dns服务器去执行名称解析，所以不会受到本地修改dns的影响
});
