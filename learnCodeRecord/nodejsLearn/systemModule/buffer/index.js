/**
 * 比较重要的点，缓存和缓冲的区别
 * 缓冲是流量整形，把突发的大数量较小规模的io整理成平稳的小数量大规模的io，以减少响应次数
 * 缓存是系统两端处理速度不匹配的折衷策略，因为CPU和Memory处理速度差异越来越大，所以利用数据的局部性（locality）特征，通过使用存储系统分级（memory hierarchy）的策略来减小这种差异带来的影响。
 */

const Buffer = require("buffer").Buffer;
// Buffer.from如果不传递 encoding 默认按照 UTF-8 格式转换存储
console.log(Buffer.from("1123213"));
console.log(Buffer.from("1123213", "utf-8"));
// start和end按字节转换，如果有中文算3个字节，所以end写错了会出现截取出乱码
console.log(Buffer.from("nodejs技术", "utf-8").toString("utf-8", 0, 8)); //nodejs�`

console.log(Buffer.from([1, 2, 3]));
// 返回一个已经初始化的Buffer，不会包含旧有数据
console.log(Buffer.alloc(10));
// 返回一个已经未初始化的Buffer，可能包含旧有数据（慎用）
console.log(Buffer.allocUnsafe(10));

const http = require("http");
let s = "";
for (let i = 0; i < 1024 * 10; i++) {
  s += "a";
}
const str = s;
const bufStr = Buffer.from(s);
const server = http.createServer((req, res) => {
  console.log(req.url);
  // 压测结论，传输buffer性能比string好很多
  if (req.url === "/buffer") {
    res.end(bufStr);
  } else if (req.url === "/string") {
    res.end(str);
  }
});

server.listen(3001);
