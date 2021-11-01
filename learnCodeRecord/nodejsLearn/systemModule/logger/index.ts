import logger, { Logger } from "./Logger";
import fs from "fs";

logger.log("hello world"); // 普通日志打印
logger.info("hello world"); // 等同于logger.log
logger.error("hello world"); // 错误日志打印
logger.warn("hello world"); // 等同于logger.error
// Logger.clear(); // 清除控制台信息

const output = fs.createWriteStream("./stdout.txt", { flags: "a" });
const errorOutput = fs.createWriteStream("./stderr.txt");

const loggerStream = Logger(output as any, errorOutput as any);

loggerStream.info("hello world!"); // 内容输出到 stdout.txt 文件
loggerStream.error("错误日志记录"); // 内容输出到 stderr.txt 文件
