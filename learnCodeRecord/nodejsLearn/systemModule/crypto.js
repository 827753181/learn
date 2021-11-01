/* 
  Cipher
  Cipher 类用于加密数据，属于对称密钥加密，假设通信双方 A、B 通讯方 A 使用 key 对明文进行加密传输，通讯方 B 接收到密文后，使用同样的 key 进行解密得到明文。
  AES/ECB/PKCS5Padding
  AES：代表算法
  ECB：代表模式
  PKCS5Padding：代表填充量
*/

/* 
  与java、c#等语言交互踩过的坑
  和 java 程序进行交互的时候，
    Java 那边使用 AES 128 位填充模式：AES/CBC/PKCS5Padding 加密方法，在 Nodejs 中采用对应的 aes-128-cbc 加密方法就能对应上。
    因为有使用向量（iv），但是 Nodejs 语言本身不默认自动填充，所以 Nodejs 中要用 createCipheriv 方法，来补全填充量，而不是 createCipher（已弃用）。
*/
function encryptCipher(str) {
  try {
    // crypto.createCipheriv(algorithm, pwd, iv)  指定算法、密码、向量创建 cipher 加密对象
    const cipher = require("crypto").createCipheriv("des-ecb", "12345678", "");

    /**
     * update方法
     * 第一个参数代表加密的数据
     * 第二参数表传入数据格式，'utf8','ascii','latin1'
     * 第三参数表加密数据输出格式,'latin1','base64',hex'。未执行返回Buffer
     */
    let encrypted = cipher.update(str, "utf8", "hex");

    /**
     * final方法，返回任何加密的内容
     * 参数可以是'latin1', 'base64' 或者 'hex'，没有指定返回Buffer
     */
    encrypted += cipher.final("hex");
    return encrypted;
  } catch (error) {
    console.log(`出错啦: ${error}`);
  }
}
// 28dba02eb5f6dd479a6144f98622a55caa67f06240f93005
console.log(encryptCipher("hello world ！！！!!!!!"));

function decodeCipher(str) {
  try {
    // crypto.createDecipheriv(algorithm, pwd, iv) 指定算法、密码、向量创建 decipher 解密对象
    const cipher = require("crypto").createDecipheriv(
      "des-ecb",
      "12345678",
      ""
    );

    /**
     * update方法
     * 第一个参数代表加密的数据
     * 第二参数表传入数据格式，'utf8','ascii','latin1'
     * 第三参数表加密数据输出格式,'latin1','base64',hex'。未执行返回Buffer
     */
    let encrypted = cipher.update(str, "hex", "utf8");

    /**
     * final方法，返回任何加密的内容
     * 参数可以是'latin1', 'base64' 或者 'hex'，没有指定返回Buffer
     */
    encrypted += cipher.final("utf8");
    return encrypted;
  } catch (error) {
    console.log(`出错啦: ${error}`);
  }
}
console.log(decodeCipher("28dba02eb5f6dd479a6144f98622a55caa67f06240f93005"));

const md5 = (str) => {
  const crypto = require("crypto");
  return crypto.createHash("md5").update(str, "utf8").digest("hex");
};

// 默认输出长度为32位小写字母
// 25f9e794323b453885f5181f1b624d0b
console.log(md5("123456789"));