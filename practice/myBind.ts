//refer: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind

Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
  }

  var self = this;
  return function (...arguments) {
    return self.call(context, ...args, ...arguments);
  };
};

function myCreateObject(proto) {
  function F() {}

  F.prototype = proto;
  return new F();
}
