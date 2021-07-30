class Lazy {
  name: string;
  taskList: any[];

  constructor(name: string) {
    this.name = name;
    this.taskList = [];
    this.do();
  }

  do() {
    //宏任务延迟执行，为插入队列提供执行时间
    setTimeout((...args) => {
      let fn = this.taskList.shift();
      fn && fn.call(this, ...args);
    }, 0);
  }

  sleep(time) {
    this.taskList.push(() => {
      setTimeout(() => {
        console.log(`wake up after ${time}`);
        this.do();
      }, time);
    });
    return this;
  }
  sleepFirst(time) {
    this.taskList.unshift(() => {
      setTimeout(() => {
        console.log(`wake up after ${time}`);
        this.do();
      }, time);
    });
    return this;
  }
  eat(thing) {
    this.taskList.push(() => {
      console.log(`eat ${thing}`);
      this.do();
    });
    return this;
  }
  sayName() {
    this.taskList.push(() => {
      console.log(`Hi! this is ${this.name}`);
      this.do();
    });
    return this;
  }
}
