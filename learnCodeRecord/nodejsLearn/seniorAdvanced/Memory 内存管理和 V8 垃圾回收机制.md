# 新生代和老生代

## 新生代空间

- Scavenge
  from Space --> to Space
  from Space 遍历找出所有未被存活的内容，复制到 toSpace（或移动到老生代空间）中，然后将 to Space 和 from Space 互换

## 老生代空间

- Mark-Sweep
  分为标记和清除两个阶段，与 Scavenge 算法只复制活对象相反，mark-sweep 在标记阶段遍历堆中所有对象时仅标记活对象，并把未标记死对象去除。
  但被清除的对象遍布于各内存地址，产生很多内存碎片。
- Mark-Compact
  与 Mark-Sweep 类似，但区别在于 mark-sweep 会留下零碎的内存碎片，所以 Mark-Compact 在清除时还会将活着的对象往一端移动。保证内存空间紧凑。移动完成后，直接清除边界之外的内存空间

## 内存泄漏

同一个作用域生成的闭包对象是被该作用域中所有下一级作用域共同持有的,下面的代码代码由于 unused 使用了 originalThing 变量，导致 someMethod 隐式地持有了 originalThing，最终就形成了 replaceThing -> theThing -> someMethod -> originalThing -> OldTheThing 的引用链。**重点：someMethod 的闭包作用域和 unused 的作用域是共享的**

```js
var theThing = null;
var replaceThing = function () {
  var originalThing = theThing;
  var unused = function () {
    if (originalThing) console.log("hi");
  };
  theThing = {
    longStr: new Array(1000000).join("*"),
    someMethod: function () {
      console.log(someMessage);
    },
  };
};
setInterval(replaceThing, 1000);
```
