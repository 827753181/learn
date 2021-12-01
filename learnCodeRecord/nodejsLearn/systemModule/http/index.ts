import http from "http";
http
  .createServer((req, res) => {
    console.log("requestCookie is", req.headers.cookie);
    console.log("request is ", req);
    if (req.url === "/withCookie") {
      // 字母大小写无所谓
      // res.setHeader("sEt-Cookie", ["a=111", "b=222"]);
      res.setHeader("Set-Cookie", ["a=111", "b=222"]);
      res.end("finish");
    } else {
      res.end("end");
    }
  })
  .listen(1233);

const sendRequest = (withCookie) => {
  const req = http.request(
    {
      // headers: withCookie
      //   ? {
      //       Cookie: ["a=111", "b=222"], // 方式一设置
      //     }
      //   : undefined,
      method: "GET",
      host: "127.0.0.1",
      port: 1233,
      path: "/withCookie",
    },
    (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk.toString()));
      res.on("end", () => {
        console.log("response body: ", data);
        console.log("response cookie: ", res.headers["set-cookie"]);
      });

      console.log("responseCookie", res.headers);
    }
  );

  withCookie && req.setHeader("Cookie", ["b=222", "c=333"]); // 方式二设置
  req.on("error", console.error);
  req.end(() => {});
};
// sendRequest(true);
