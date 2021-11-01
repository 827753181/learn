// CommonJS模块的重要特性是加载时执行，
// 即脚本代码在require的时候，就会全部执行。
// CommonJS的做法是，一旦出现某个模块被"循环加载"，就只输出已经执行的部分，还未执行的部分不会输出。

// a.js
console.log('a模块start');

exports.testa = 1;

undeclaredVariable = 'a模块未声明变量'

const b = require('./moduleb');

exports.testa1 = 2;
console.log('b.testb1值：',b.testb1);

console.log('a模块加载完毕: b.testb值：',b.testb);