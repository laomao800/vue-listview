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
    config.module.rule('md').test(/\.md$/)
    config.module
      .rule('md')
      .use('html-loader')
      .loader('html-loader')
    config.module
      .rule('md')
      .use('markdown-loader')
      .loader('markdown-loader')
  },

  configureWebpack: config => {
    const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
    config.plugins.push(new LodashModuleReplacementPlugin())

    if (process.env.BUILD_MODE === 'component') {
      config.externals = config.externals || {} // for webpack inspect
      config.externals['element-ui'] = 'ELEMENT'
    }

    const version = process.env.VERSION || require('./package.json').version
    const banner = `PPS Vue Listview v${version}`
    const webpack = require('webpack')
    config.plugins.push(new webpack.BannerPlugin(banner))
  },

  devServer: {
    before: require('./tests/mock-api')
  }
}
