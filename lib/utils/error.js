function createError(message, statusCode = null, innerError = null) {
  const error = new Error(message || (innerError && innerError.message) || 'Unknown error');

  return Object.assign(error, {
    code: parseInt(statusCode),
    innerError
  });
}

function throwError(...args) {
  throw createError.apply(null, args);
}

export {
  createError,
  throwError
}
