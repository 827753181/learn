import http from "http";
import undici from "undici";

http
  .createServer((req, res) => {
    if (req.url?.includes("/hahaah")) {
      res.write("test");
      res.write("test");
      res.write("test");
      res.write("test");
      res.write("test");
      res.write("test");
      res.write("test");
      res.write("test");
      res.write("test");
      res.write("test");
      res.write("test");
      res.write("test");
      res.write("test");
      res.write("test");
      res.write("test");
      res.write("test");
      res.write("test");
      setTimeout(() => {
        res.write("test");
        res.write("test");
        res.end();
      }, 1000);
    } else {
      res.end();
    }
  })
  .listen(4000);

/* const request = async () => {
  const { statusCode, headers, body, trailers, opaque, context } =
    await undici.request("http://localhost:4000/hahaah", { method: "GET" });

  console.log({ statusCode, headers, body, trailers, opaque, context });

  for await (const data of body) {
    console.log("data", data.toString());
  }
};
 */
/* const request = async () => {
  const client = new undici.Client("http://localhost:4000");
  const { statusCode, headers, body, trailers, opaque, context } =
    await client.request({
      path: "/hahaah",
      method: "GET",
    });

  body.setEncoding("utf-8");
  body.on("data", console.log);
  body.on("end", () => console.log("end"));
}; */

// 弃用请求控制器
const abortController = new AbortController();

// 流的概念
const request = async () => {
  const factory = ({ opaque: res }) => res;
  const client = new undici.Client("http://localhost:4000");

  /* 
    流的概念要是看不懂看这个
    const factory = ({ opaque: res }) => res;
    const url = 'https://images.pexels.com/photos/3599228/pexels-photo-3599228.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500';
    undici.stream(url, {
      opaque: fs.createWriteStream('./pexels-photo-3599228.jpeg')
    }, factory, (err) => {
      if (err) {
        console.error('failure', err)
      } else {
        console.log('success')
      }
    }); 
  */
  http
    .createServer((req, res) => {
      client.stream(
        {
          path: "/hahaah",
          method: "GET",
          // 设置写入流，写入到res
          opaque: res,
        },
        factory,
        (err) => {
          if (err) console.log("failure", err);
          else console.log("success");
        }
      );
    })
    .listen(3010);
  const { body } = await undici.request("http://localhost:3010", {
    signal: abortController.signal,
    method: "GET",
  });

  for await (const data of body) {
    console.log("data", data.toString());
  }
};
request();
// 会报错显示被abort
// abortController.abort();


