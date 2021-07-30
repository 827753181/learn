/* 
//基础版本
class myPromise {
  // 回调收集
  callbacks = [];
  constructor(fn) {
    fn(this._resolve.bind(this));
  }

  then(onFulfilled) {
    this.callbacks.push(onFulfilled);
    return this;
  }

  _resolve(val) {
    const me = this;
    setTimeout(() => {
      me.callbacks.reduce((pre, cur) => {
        cur(pre);
      }, val);
    });
  }
} */

class myPromise {
  //回调收集
  taskList = [];
  //返回值保存
  value = null;
  //状态管理
  state = "pending";
  //错误原因
  reason = null;

  constructor(fn) {
    try {
      fn(this._resolve.bind(this), this._reject.bind(this));
    } catch (error) {
      this._reject(error);
    }
  }
  static all(list) {
    const promiseList = list.map((ele) =>
      ele instanceof myPromise ? ele : myPromise.resolve(ele)
    );
    let count = 0,
      result = [];
    return new myPromise((resole, reject) => {
      for (let key in promiseList) {
        promiseList[key]
          .then((res) => {
            count++;
            result[key] = res;
            if (count === promiseList.length) {
              resole(result);
            }
          })
          .catch((error) => {
            reject(error);
            break;
          });
      }
    });
  }

  //静态resolve，reject方法
  static resolve(val) {
    if (val instanceof myPromise) {
      return val;
    } else {
      return new myPromise((resolve, reject) => {
        if (val && val.then === "function") {
          try {
            const valThen = val.then;
            valThen.call(val, resolve, reject);
          } catch (err) {
            reject(err);
          }
        } else resolve(val);
      });
    }
  }
  static reject(err) {
    if (err instanceof myPromise) {
      return err;
    } else {
      return new myPromise((resolve, reject) => {
        if (err && err.then === "function") {
          try {
            const valThen = err.then;
            //只处理reject
            valThen.call(err, null, reject);
          } catch (error) {
            reject(error);
          }
        } else {
          reject(err);
        }
      });
    }
  }

  then(onFulfilled = null, onReject = null) {
    return new myPromise((resolve, reject) => {
      this._handle({
        onFulfilled,
        onReject,
        resolve,
        reject,
      });
    });
  }
  catch(onRejected) {
    return this.then(null, onRejected);
  }
  finally(done) {
    return this.then(done, done);
  }

  _handle({ onFulfilled, onReject, resolve, reject }) {
    if (this.state === "pending") {
      //then走这里过,pending则收集
      this.taskList.push({ onFulfilled, onReject, resolve, reject });
    } else {
      //其他走这里,将返回值||错误值传递给内置（下一级）promise的resolve||reject
      const runFn = this.state === "fulfilled" ? onFulfilled : onReject;
      if (!runFn) {
        //如果没有处理函数，直接内置promise resolve|reject 值
        (this.state === "fulfilled" ? resolve : reject)(
          this.state === "fulfilled" ? this.value : this.reason
        );
        return;
      }
      try {
        const inputVal = this.state === "fulfilled" ? this.value : this.reason;
        let value = runFn(inputVal);
        // 此处已经脱离了最初的promise，进入内置promise处理中
        resolve(value);
      } catch (error) {
        reject(error);
      }
    }
  }

  _resolve(val) {
    //异常处理
    if (this.state !== "pending") return;

    //返回promise处理
    if (val && (typeof val.then === "function" || typeof val === "object")) {
      const valThen = val.then;
      if (valThen && typeof valThen === "function") {
        valThen.call(this, this._resolve.bind(this), this._reject.bind(this));
        return;
      }
    }

    setTimeout(() => {
      this.value = val;
      this.state = "fulfilled";
      this.taskList.forEach((cur) => this._handle(cur));
    });
  }
  _reject(err) {
    if (this.state !== "pending") return;
    setTimeout(() => {
      this.reason = err;
      this.state = "rejected";
      this.taskList.forEach((cur) => this._handle(cur));
    });
  }
}


/*

//以下是测试代码 
var promisesAplusTests = require("promises-aplus-tests");

function test(adaptor) {
  adaptor.deferred = function () {
    const defer = {};
    defer.promise = new adaptor((resolve, reject) => {
      defer.resolve = resolve;
      defer.reject = reject;
    });
    return defer;
  };
  promisesAplusTests(adaptor, function (err) {
    // All done; output is in the console. Or check `err` for number of failures.
  });
}
test(myPromise);
 */
