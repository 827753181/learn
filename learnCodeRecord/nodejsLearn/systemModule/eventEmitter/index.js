
// 同步还是异步，EventEmitter 会按照监听器注册的顺序同步地调用所有监听器。 所以必须确保事件的排序正确，且避免竞态条件
const events = require('events');
const emitter = new events.EventEmitter();

// 当emit时，回调就会同步执行
emitter.on('test',function(){
    console.log(111)
});
emitter.emit('test');
console.log(222)

// 输出
// 111
// 222