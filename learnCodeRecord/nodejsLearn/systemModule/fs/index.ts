import fs from "fs";
import util from "util";
// 不推荐使用 fs.exists() 判断文件是否存在，会引起竞态条件。
/* 
(async () => {
  const exists = await util.promisify(fs.exists)('text.txt');
  console.log(exists);
  await sleep(10000);
  if (exists) {
    try {
      const res = await util.promisify(fs.readFile)('text.txt', { encoding: 'utf-8' });
      console.log(res);
    } catch (err) {
      console.error(err.code, err.message);
      throw err;
    }
  }
})();
 */
const fileName = "./test.txt";
(async () => {
  try {
    let stats = await util.promisify(fs.stat)(fileName);
    console.log(stats.isDirectory(), stats.isFile()); // true false
    await util.promisify(fs.stat)("./test2.txt");
  } catch (err) {
    console.log(err);
  }
})();

fs.access(fileName, fs.constants.F_OK, (err) => {
  console.log(`${fileName} ${err ? "不存在" : "存在"}`);
});
fs.access(fileName, fs.constants.R_OK, (err) => {
  console.log(`${fileName} ${err ? "不可读" : "可读"}`);
});

fs.access(fileName, fs.constants.W_OK, (err) => {
  console.log(`${fileName} ${err ? "不可写" : "可写"}`);
});

fs.access(fileName, fs.constants.F_OK | fs.constants.W_OK, (err) => {
  console.log(
    `${fileName} ${
      err ? (err.code === "ENOENT" ? "不存在" : "存在只可读") : "存在且可写"
    }`
  );
});
fs.access(fileName, fs.constants.X_OK, (err) => {
  console.log(`${fileName} ${err ? "不可执行" : "可执行"}`);
});
