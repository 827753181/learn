// 可以选择使用 undici-fetch 简单的处理一些请求。
import {fetch} from "undici";

async function request() {
  const res = await fetch("http://localhost:1233/withCookie");
  try {
    const json = await res.json();
    console.log(json);
  } catch (err) {
    console.log(err);
  }
}
request();
