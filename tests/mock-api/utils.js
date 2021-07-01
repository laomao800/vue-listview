module.exports = {
  successWrap(data) {
    return {
      success: true,
      result: data,
    }
  },

  errorWrap(msg, code) {
    return {
      error_info: {
        code: code || 500,
        msg,
      },
      success: false,
    }
  },
}
