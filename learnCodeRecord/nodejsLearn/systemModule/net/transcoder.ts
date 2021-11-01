export default class Transcoder {
  packageHeaderLen: number;
  serialNumber: number;
  packageSerialNumberLen: number;
  constructor() {
    this.packageHeaderLen = 4; // 包头长度
    this.serialNumber = 0; //包序号
    this.packageSerialNumberLen = 2; // 包序号占用字节
  }

  /**
   * @description: 编码
   * @param { Object } data Buffer 对象数据
   * @param { Int } serialNumber 包序号，客户端编码时自动生成，服务端解码之后在编码时需要传入解码的包序列号
   */
  encode(data, serialNumber?:number) {
    const body = Buffer.from(data);

    const header = Buffer.alloc(this.packageHeaderLen);

    // 一次写16位
    header.writeInt16BE(serialNumber || this.serialNumber,0);
    header.writeInt16BE(body.length, this.packageSerialNumberLen); // 跳过包序列号的前两位

    if (serialNumber === undefined) {
      this.serialNumber++;
    }
    
    return Buffer.concat([header, body]);
  }

  /**
   * @description:
   * @param {*} buffer Buffer对象数据
   */
  decode(buffer) {
    const header = buffer.slice(0, this.packageHeaderLen);
    const body = buffer.slice(this.packageHeaderLen);

    return {
      // 一次读取16位
      serialNumber: header.readInt16BE(),
      bodyLength: header.readInt16BE(this.packageSerialNumberLen),
      body: body.toString(),
    };
  }

  /**
   * @description:
   * 获取包长度两种情况：
   * 1. 如果当前 buffer 长度数据小于包头，肯定不是一个完整的数据包，因此直接返回 0 不做处理（可能数据还未接收完等等）
   * 2. 否则返回这个完整的数据包长度
   * @param {*} buffer
   */

  getPackageLength(buffer) {
    if (buffer.length < this.packageHeaderLen) {
      return 0;
    }

    const bodyLength = buffer.readInt16BE(this.packageSerialNumberLen);
    return bodyLength + this.packageHeaderLen;
  }
}
