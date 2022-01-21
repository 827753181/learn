import { createReadStream, createWriteStream } from "fs";
console.log("1231212313");
console.log("1231212313");
console.log("1231212313");
console.log("1231212313");
console.log("1231212313");

const writeAble = createWriteStream("./test.txt", {
  encoding: "utf8",
  flags: "w+",
});
process.stdout.pipe(writeAble, {});
