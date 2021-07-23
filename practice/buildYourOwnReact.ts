import {curry} from './curry';
const fun = (b) => {
  return (a) => {
    console.log(a,b)
  }
}
let aa = curry(fun)(2);
console.log(aa);
console.log(1,2,3,3);