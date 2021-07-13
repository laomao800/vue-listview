module.exports = () =>
  new Promise((resolve) => global.mockApiServer.close(resolve))
