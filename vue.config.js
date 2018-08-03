const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

const IS_PROD = process.env.NODE_ENV === 'production'

module.exports = {
  baseUrl: './',

  pages: {
    index: {
      entry: 'dev/main.js'
    }
  },

  productionSourceMap: !IS_PROD,

  css: {
    sourceMap: !IS_PROD,
    extract: false
  },

  chainWebpack: config => {
    config.module.rule('js').exclude.add(/dist/)
    config.module
      .rule('js')
      .use('babel-loader')
      .loader('babel-loader')
      .tap(() => ({
        plugins: ['lodash']
      }))
  },

  configureWebpack: config => {
    if (IS_PROD) {
      config.plugins.push(new LodashModuleReplacementPlugin())
    }
  },

  devServer: {
    before: require('./tests/mock-api')
  }
}
