/*import fs from "fs";

const readableStream = fs.createReadStream("./test1.txt");
const writeableStream = fs.createWriteStream("./test2.txt", {
  flags: "a+",
});
readableStream.pipe(writeableStream, {
  end: false,
});

readableStream.on("end", function() {
  writeableStream.end("\n readable has closed\n");
});

readableStream.on("error", () => {
  console.log("error");
  writeableStream.end("\n readable has errored\n");
}); */
import fs from "fs";
import path from "path";

/**
 * @description: 合并目录下所有文件内容到一个对应文件
 * @param {*} fileDir 源目录路径
 * @param {*} targetFile 目标文件路径
 * @param {*} match 正则，匹配源目录下什么文件
 */
function readFileInDirAndMergeout(
  fileDir: string,
  targetFile: string,
  match = /.*/
) {
  let files = fs.readdirSync(fileDir);
  files = files
    .filter((item) => match.test(item))
    .map((item) => path.resolve(__dirname, fileDir, item));
  let readStream = fs.createWriteStream(targetFile, {
    flags: "a+",
  });
  readStream.write("开始读取\n");
  readFilesAndMergeout(files, readStream);
}

/**
 * @description: 传入文件列表，合并文件列表内文件内容到对应文件
 * @param {string} files 源文件列表
 * @param {fs} writeStream 目标文件
 * @return {*}
 */
function readFilesAndMergeout(files: string[], writeStream: fs.WriteStream) {
  if (!files.length) {
    writeStream.end("读取结束\n\n");
  }

  let file = files.shift();
  if (file) {
    const readStream = fs.createReadStream(file);
    readStream.pipe(writeStream, {
      end: false,
    });
    readStream
      .on("end", () => {
        readFilesAndMergeout(files, writeStream);
      })
      .on("error", (err) => {
        console.log("a error has happened", err);
        writeStream.end("读取出错");
      });
  }
}
readFileInDirAndMergeout("./readable", "./output/output.txt", /\.txt$/);
