var throttle = (fn, delay = 500) => {
  let now = 0;
  return (...args) => {
    if (Date.now() - delay > now) {
      fn(this, ...args);
      now = Date.now();
    }
  };
};
