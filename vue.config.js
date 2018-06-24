module.exports = {
  devServer: {
    before: require('./tests/mock-api')
  }
}
