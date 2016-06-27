function createError(message, statusCode = null, innerError = null) {
    message = message || (innerError && innerError.message) || 'Unknown error'
    return Object.assign(new Error(message), {
        code: statusCode,
        innerError
    })
}

function throwError(...args) {
    throw createError.call(args)
}

export {
    createError,
    throwError
}
