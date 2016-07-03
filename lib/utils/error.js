function createError(message, statusCode = null, innerError = null) {
    message = message || (innerError && innerError.message) || 'Unknown error'
    return Object.assign(new Error(message), {
        code: parseInt(statusCode),
        innerError
    })
}

function throwError(...args) {
    throw createError.apply(null, args)
}

export {
    createError,
    throwError
}
