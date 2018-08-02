const IS_PROD = process.env.NODE_ENV === 'production'

module.exports = {
  pages: {
    index: {
      entry: 'dev/main.js'
    }
  },

  productionSourceMap: !IS_PROD,

  css: {
    sourceMap: !IS_PROD
  },

  devServer: {
    before: require('./tests/mock-api')
  }
}
