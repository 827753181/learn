//重写区，用于自己测试自己从0再写一次的能力
class myPromise {
  state = "pending";
  taskList = [];
  value = null;
  failReason = null;
  constructor(fn) {
    try {
      fn(this._resolve.bind(this), this._reject.bind(this));
    } catch (err) {
      this._reject(err);
    }
  }
  then(onFulfilled, onReject) {
    return new myPromise((resolve, reject) => {
      this._handle({
        onFulfilled,
        onReject,
        resolve,
        reject,
      });
    });
  }
  _handle({ onFulfilled, onReject, resolve, reject }) {
    if (this.state === "pending") {
      //注入then和catch时暂存任务
      this.taskList.push({ onFulfilled, onReject, resolve, reject });
    } else {
      const runFn = this.state === "fulfilled" ? onFulfilled : onReject;
      const inputValue =
        this.state === "fulfilled" ? this.value : this.failReason;
      if (!runFn) {
        (this.state === "fulfilled" ? resolve : resolve)(inputValue);
        return;
      } else {
        try {
          const value = runFn(inputValue);
          resolve(value);
        } catch (err) {
          reject(err);
        }
      }
    }
  }
  catch(onReject) {
    this.then.call(this, null, onReject);
  }
  _resolve(value) {
    if (this.state !== "pending") return;
    if (value && value.then === "function") {
      value.then.call(this, this._resolve.bind(this), this._reject.bind(this));
      return;
    }

    //延迟执行，方便即时执行的resolve注入then和catch
    setTimeout(() => {
      this.value=  value;
      this.state = 'fulfilled';
      this.taskList.forEach((ele) => this._handle(ele));
    });
  }
  _reject(error) {
    if (this.state !== "pending") return;
    //延迟执行，方便即时执行的resolve注入then和catch
    setTimeout(() => {
      this.value=  error;
      this.state = 'rejected';
      this.taskList.forEach((ele) => this._handle(ele));
    });
  }
}
