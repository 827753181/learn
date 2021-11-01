import net from "net";
import Transcoder from "./transcoder";
const transcoder = new Transcoder();

const client = net.createConnection({
  host: "127.0.0.1",
  port: 3004,
});
let verageBuffer = (null as unknown) as Buffer; //上次Buffer剩余数据

client
  .on("data", (buffer) => {
    if (verageBuffer) buffer = Buffer.concat([verageBuffer, buffer]);
    let packageLen = 0;
    while ((packageLen = transcoder.getPackageLength(buffer))) {
      let data = transcoder.decode(buffer.slice(0, packageLen));
      console.dir(data);

      buffer = buffer.slice(packageLen);
    }
    verageBuffer = buffer;
  })
  .on("error", (err) => {
    // 例如监听一个未开启的端口就会报 ECONNREFUSED 错误

    console.error("服务器异常：", err);
  })
  .on("close", (had_error) => {
    console.log("客户端链接断开！是否有错误", had_error);
  });

client.on("connect", () => {
  client.write(transcoder.encode("ahahahahahah "));
  client.write(transcoder.encode(`connect is created `));
  // 这里不会在下次传输过去一起被收到（TCP 粘包问题），因为用transcoder做了encode处理，接收端也做了decode处理
  client.write(transcoder.encode("JavaScript "));
  client.write(transcoder.encode("TypeScript "));
  setTimeout(() => client.write(transcoder.encode("close")), 1000);

  /*  client.write(Buffer.from("ahahahahahah "));
  client.write(`connect is created `);
  setTimeout(() => {
    // 这里会在下次传输过去一起被收到（TCP 粘包问题）
    client.write("JavaScript ");
    client.write("TypeScript ");
    setTimeout(() => client.write("close"), 1000);
  }, 1); */
});
