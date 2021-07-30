function compose(...args) {
  let steps = args.reverse();
  let init = steps.shift();

  return function (...rests) {
    return steps.reduce((total, step) => step(total), init(...rests));
  };
}
const init = (...args) => args.reduce((total, val) => total + val, 0);
const step2 = (val) => val + 2;
const step3 = (val) => val + 3;
const step4 = (val) => val + 4;
