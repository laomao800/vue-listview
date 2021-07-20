/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
  publicPath: '',

  pages: {
    index: {
      entry: 'example',
    },
  },

  productionSourceMap: false,

  css: {
    sourceMap: process.env.NODE_ENV !== 'production',
    extract: false,
  },

  chainWebpack: (config) => {
    config.module.rule('js').exclude.add(/dist/)
    config.module.rule('md').test(/\.md$/)
    config.module.rule('md').use('html-loader').loader('html-loader')
    config.module.rule('md').use('markdown-loader').loader('markdown-loader')
    config.performance.hints(false)
  },

  configureWebpack: (config) => {
    if (process.env.BUILD_MODE === 'component') {
      const nodeExternals = require('webpack-node-externals')
      config.externals = config.externals || {}
      config.externals = [
        config.externals,
        {
          'element-ui': {
            root: 'ELEMENT',
            commonjs: 'element-ui',
            commonjs2: 'element-ui',
            amd: 'element-ui',
          },
        },
        nodeExternals({
          allowlist: [/^@babel/, /current-script-polyfill/],
        }),
      ]
    }

    const version =
      process.env.TARGET_VERSION || require('./package.json').version
    const banner = `Vue Listview v${version}`
    const webpack = require('webpack')
    config.plugins.push(new webpack.BannerPlugin(banner))
  },

  devServer: {
    disableHostCheck: true,
    before: require('./tests/mock-api'),
  },
}
