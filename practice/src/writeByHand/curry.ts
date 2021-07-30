export function curry(fn, ...args) {
  let argTotalLen = fn.length;

  return function(...rests)  {
    const _args = [...args, ...rests];
    console.log(_args);
    if (_args.length >= argTotalLen) {
      return fn.call(this, ..._args.slice(0, argTotalLen));
    } else {
      return curry.call(this, fn,..._args);
    }
  };
}
