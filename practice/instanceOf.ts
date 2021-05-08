//模拟 instanceof
function instance_of(X, Y) {
  var O = X.__proto__; //取 X 的隐式原型
  var P = Y.prototype; //取 Y 的显示原型
  while (true) {
    if (O === null) return false;
    // 这里重点 ： 当 O 严格等于 P 时，返回 true
    if (O === P) return true;
    O = O.__proto__;
  }
}
