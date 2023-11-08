const debounce = (func, timeoutMS) => {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), timeoutMS);
  };
};

export default debounce;
