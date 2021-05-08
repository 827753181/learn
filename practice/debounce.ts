const debounce = (fn, delay) => {
  let timer = null;
  let ctx = this;
  return (...args) => {
    timer && clearTimeout(timer);
    timer = setTimeout(() => fn.apply(ctx, args), delay);
  };
};
