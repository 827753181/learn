// b.js
console.log('b模块start');

exports.testb = 2;

const a = require('./modulea');
console.log('a.testa值：', a.testa);

// 启动b的话，a里此处读取不到完全的b，所以a处读取到的testb1为undefined
exports.testb1 = 22;

console.log('undeclaredVariable: ', undeclaredVariable);
// 启动a的话，b里此处读取不到完全的a，此处的testa1为undefined
console.log('b模块加载完毕: a.testa1值：', a.testa1);