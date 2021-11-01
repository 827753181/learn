// ES6模块的运行机制与CommonJS不一样，它遇到模块加载命令import时，不会去执行模块，而是只生成一个引用。等到真的需要用到时，再到模块里面去取值。
// 因此，ES6模块是动态引用，不存在缓存值的问题，而且模块里面的变量，绑定其所在的模块
import {bar} from './importb.js';
export function foo() {
  bar();  
  console.log('执行完毕');
}
foo();

/* 
  按照CommonJS规范，
  上面的代码是没法执行的。a先加载b，然后b又加载a，
  这时a还没有任何执行结果，所以输出结果为null，
  即对于b.js来说，变量foo的值等于null，后面的foo()就会报错。
 */