exports.tryCatch = async (func, ...args) => {
  try {
    return [null, await func(...args)];
  } catch (err) {
    return [err];
  }
};
