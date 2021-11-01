//@ts-nocheck

import util from "util";
function Logger(stdout: typeof process.stdout, stderr: typeof process.stderr) {
  // step1 检查当前对象是否为Logger实例

  if (!(this instanceof Logger)) {
    return new Logger(stdout, stderr);
  }
  if (!stdout || !(stdout.write instanceof Function)) {
    //检查是否是一个可写流实例
    throw new Error("Logger expects a writable stream instance");
  }
  // 如果未制定stderr，使用stdout作为stderr
  if (!stderr) {
    stderr = stdout;
  }
  // 设置jsobject的属性
  let props = {
    enumerable: false,
    writable: true,
    configurable: false,
  } as Partial<PropertyDescriptor>;

  Object.defineProperty(
    this,
    "_stdout",
    Object.assign(
      {
        value: stdout,
      },
      props
    )
  );

  Object.defineProperty(
    this,
    "_stderr",
    Object.assign(
      {
        value: stderr,
      },
      props
    )
  );

  Object.defineProperty(
    this,
    "_times",
    Object.assign(
      {
        value: new Map(),
      },
      props
    )
  );
  // 将原型方法上的属性绑定到Logger实例上
  const keys = Object.keys(Logger.prototype);

  for (let k in keys) {
    this[keys[k]] = this[keys[k]].bind(this);
  }
}
Logger.prototype.log = function() {
  this._stdout.write(util.format.apply(this, arguments) + "\n");
};

Logger.prototype.info = Logger.prototype.log;
Logger.prototype.warn = function() {
  this._stderr.write(util.format.apply(this, arguments) + "\n");
};
Logger.prototype.error = Logger.prototype.warn;

Logger.prototype.trace = function trace(...args) {
  const err = {
    name: "Trace",
    message: util.format.apply(null, args),
  };
  // 源自V8引擎的Stack Trace API https://github.com/v8/v8/wiki/Stack-Trace-API

  Error.captureStackTrace(err, trace);
  this.error(err.stack);
};
Logger.prototype.clear = function() {
  if (this._stdout.isTTY) {
    const { cursorTo, clearScreenDown } = require("readline");
    cursorTo(this._stdout, 0, 0);
    clearScreenDown(this._stdout);
  }
};
Logger.prototype.dir = function(object, options) {
  options = Object.assign({ customInspect: false }, options);
  /**
   * util.inspect(object,[showHidden],[depth],[colors])是一个将任意对象转换为字符串的方法，通常用于调试和错误的输出。
   * showhidden - 是一个可选参数，如果值为true，将会输出更多隐藏信息。
   * depth - 表示最大递归的层数。如果对象很复杂，可以指定层数控制输出信息的多少。
   * 如果不指定depth,默认会递归3层，指定为null表示不限递归层数完整遍历对象。
   * 如果color = true，输出格式将会以ansi颜色编码，通常用于在终端显示更漂亮的效果。
   */
  this.log(util.inspect(object, options));
};
Logger.prototype.time = function(label) {
  // process.hrtime()方法返回当前时间以[seconds, nanoseconds] tuple Array表示的高精度解析值， nanoseconds是当前时间无法使用秒的精度表示的剩余部分。
  this._time.set(label, process.hrtime());
};
Logger.prototype.timeEnd = function(label) {
  let time = this._time.get(label);
  if (!time) {
    process.emitWarning(`No such label '${label}' for console.timeEnd()`);
    return;
  }
  const duration = process.hrtime(time);
  const ms = duration[0] * 1000 + duration[1] / 1e6; // 1e6 = 1000000.0 1*10*6
  this.log("%s: %sms", label, ms.toFixed(3));
  this._times.delete(label);
  // process.hrtime()方法返回当前时间以[seconds, nanoseconds] tuple Array表示的高精度解析值， nanoseconds是当前时间无法使用秒的精度表示的剩余部分。
  this._time.set(label, process.hrtime());
};

export { Logger };
export default new Logger(process.stdout, process.stderr);
// module.exports.Logger = Logger;
