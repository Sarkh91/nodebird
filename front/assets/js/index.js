export function throttle(callback, delay = 500) {
  let timer;
  if (!timer) {
    callback();
  }

  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        callback.apply(this, arguments);
      }, delay);
    }
  };
}
