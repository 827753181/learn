/* 
  new操作符做了这些事：

  他创建了一个全新的对象
  他会被执行[[Prototype]] (也就是__proto__) 链接
  它使this指向新创建的对象
  通过new创建的每个对象将最终被[[Prototype]]链接到这个函数的prototype对象上
  如果函数没有返回对象类型Object(包含Function，Array，Date，RegExg，Error)，那么new表达式中的函数调用将返回对象引用
*/

function objectFactory(factory, ...args) {
  let result = new Object();
  result.__proto__ = factory.prototype;
  const facRes = factory.apply(this, args);
  if (typeof facRes === "object") {
    result = facRes;
  }
  return result;
}
