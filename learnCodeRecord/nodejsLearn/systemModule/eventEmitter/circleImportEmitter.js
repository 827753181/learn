const events = require("events");
const emitter = new events.EventEmitter();
const test = () => console.log("test");

/** 例一 */
// emitter.on('test', function() {
//     test();
//     //循环引用，死循环导致栈溢出
//     emitter.emit('test');
// })

// emitter.emit('test');

// /** 例二 */
emitter.on("test", function () {
  test();
  //没事，就是单纯的加了个test事件监听而已
  emitter.on("test", test);
});

emitter.emit("test");
emitter.emit("test"); //会输出3次
