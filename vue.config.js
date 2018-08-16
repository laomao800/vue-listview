module.exports = {
  pages: {
    index: {
      entry: 'dev/main.js'
    }
  },

  productionSourceMap: false,

  css: {
    sourceMap: process.env.NODE_ENV !== 'production',
    extract:
      process.env.NODE_ENV === 'production' &&
      process.env.BUILD_MODE !== 'component'
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
    const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
    config.plugins.push(new LodashModuleReplacementPlugin())

    if (process.env.BUILD_MODE === 'component') {
      config.externals = config.externals || {} // for webpack inspect
      config.externals['element-ui'] = 'ELEMENT'
    }
  },

  devServer: {
    before: require('./tests/mock-api')
  }
}
