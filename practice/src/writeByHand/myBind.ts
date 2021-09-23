//refer: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind

Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError(
      "Function.prototype.bind - what is trying to be bound is not callable"
    );
  }
  var self = this,
    FNoop = function () {};
  var fBound = function (...subArgs) {
    // 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
    // 以上面的是 demo 为例，如果改成 `this instanceof fBound ? null : context`，实例只是一个空对象，将 null 改成 this ，实例会具有 habit 属性
    // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
    return self.apply(
      this instanceof fBound ? this : context,
      ...args,
      ...subArgs
    );
  };
  // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
  // 注释的部分的缺点，修改fBound的prototype时会变更当前构造函数的prototype，所以添加中转空函数
  // fBound.prototype = self.prototype;
  FNoop.prototype = self.prototype;
  fBound.prototype = new FNoop();

  return fBound;
};