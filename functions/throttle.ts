export const throttle = (callback: Function, delay: number) => {
  let wait = false;
  return function () {
    if (!wait) {
      callback();
      wait = true;
      setTimeout(function () {
        wait = false;
      }, delay);
    }
  };
};
