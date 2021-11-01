import net from "net";
import Transcoder from "./transcoder";

const transcoder = new Transcoder();
const config = {
  PORT: 3004,
  HOST: "127.0.0.1",
};

const server = net.createServer((...args) => {
  // console.dir(...args);
});
// 监听端口
server.listen(config.PORT, config.HOST);

let verageBuffer = null as unknown as Buffer; //剩余buffer;

server
  .on("listening", () => {
    console.log(`listening at ${config.HOST}:${config.PORT}`);

    console.log("listening");
  })
  .on("error", (err) => {
    console.log("error");
    // @ts-ignore
    if (err.code === "EADDRINUSE") {
      console.log(`服务器端口已经被占用, retrying...`);

      setTimeout(() => {
        server.close();
        server.listen(config.PORT, config.HOST);
      }, 1000);
    } else {
      console.log(`服务器异常`);
    }
  })
  .on("close", () => {
    console.log("close");
  })
  .on("connection", (socket) => {
    console.log("connection");
    socket.on("data", (buffer) => {
      if (verageBuffer) buffer = Buffer.concat([verageBuffer, buffer]);
      let packageLen = 0;
      let totalResponse = "";
      while ((packageLen = transcoder.getPackageLength(buffer))) {
        console.log(buffer.slice(0, packageLen).toString());

        let data = transcoder.decode(buffer.slice(0, packageLen));
        console.dir(data);
        totalResponse += data.body;

        buffer = buffer.slice(packageLen);
      }
      verageBuffer = buffer;

      socket.write(
        transcoder.encode(
          Buffer.from(`received : ${totalResponse} \n answer: 你好呀！\n`)
        ),
        () => {
          if (totalResponse === "close") {
            server.close();
            socket.destroy();
          }
        }
      );
    });
  });
