import util from "util";
import fs from "fs";

fs.readFile("text.txt", "utf8", function (err, result) {
  console.error("Error: ", err);
  console.log("Result: ", result); // Nodejs Callback 转 Promise 对象测试
});

const readFilePromisify = util.promisify(fs.readFile);
readFilePromisify("text.txt", "utf8")
  .then((res) => {
    console.log("Promisify Result: ", res);
  })
  .catch((err) => {
    console.log("Promisify Error: ", err);
  });
fs.readFile[util.promisify.custom] = () => {
  return Promise.reject("该文件暂时禁止读取");
};
fs.readFile[util.promisify.custom] = () => Promise.reject("该文件禁止读取");
const readFilePromisifyCustom = util.promisify(fs.readFile);

readFilePromisifyCustom("text.txt", "utf8")
  .then((result) => console.log(result))
  .catch((err) => console.log(err)); // 该文件暂时禁止读取

// --- 自己的实现
const myCustomKey = Symbol("util.promisify.custom");
const myCustomArgumentsKey = Symbol("util.promisify.customArgumentsKey");
function mayJumpPromisify(originFun) {
  if (typeof originFun !== "function") {
    throw new Error("params 1 must be a function");
  }
  if (originFun[myCustomKey]) {
    let fn = originFun[myCustomKey];
    if (typeof fn !== "function") {
      throw new Error(
        'The "mayJunPromisify.custom" property must be of type Function. Received type number'
      );
    }

    return Object.defineProperty(fn, myCustomKey, {
      value: fn,
      enumerable: false,
      writable: false,
      configurable: true,
    });
  }
  return function (...args) {
    return new Promise((res, rej) => {
      originFun.call(this, ...args, (err, ...values) => {
        try {
          if (err) rej(err);
          else {
            if (
              values.length > 0 &&
              originFun[myCustomArgumentsKey] &&
              Array.isArray(originFun[myCustomArgumentsKey])
            ) {
              let obj = {};
              for (let key in originFun[myCustomArgumentsKey]) {
                let keyName = originFun[myCustomArgumentsKey][key];
                obj[keyName] = values[key];
              }
              res(obj);
            } else {
              res(...values);
            }
          }
        } catch (err) {
          rej(err);
        }
      });
    });
  };
}

mayJumpPromisify.custom = myCustomKey;
fs.readFile[mayJumpPromisify.custom] = () => {
  return Promise.reject("该文件也暂时禁止读取哦");
};
const myReadFilePromisify = mayJumpPromisify(fs.readFile);
myReadFilePromisify("text.txt", "utf8")
  .then((res) => {
    console.log("my Promisify Result: ", res);
  })
  .catch((err) => {
    console.log("my Promisify Error: ", err);
  });

function getUserById(id, cb) {
  const name = "张三",
    age = 20;

  cb(null, id, name, age);
}
mayJumpPromisify(getUserById)(1111)
  .then((res) => console.log(res, "res"))
  .catch((err) => console.log(err, "err"));
