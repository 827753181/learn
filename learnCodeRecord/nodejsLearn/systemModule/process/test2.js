// worker.js
const http = require("http");
const server = http.createServer((req, res) => {
  res.end("I am worker, pid: " + process.pid + ", ppid: " + process.ppid);
});

let worker;
process.title = "node-worker";
setInterval(() => {
  console.log(333);
}, 20000);
