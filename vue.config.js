module.exports = {
  publicPath: '',

  pages: {
    index: {
      entry: 'example'
    }
  },

  productionSourceMap: false,

  css: {
    sourceMap: process.env.NODE_ENV !== 'production',
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
    // 关闭 webpack 性能警告
    config.performance = {
      hints: false
    }

    const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
    config.plugins.push(
      new LodashModuleReplacementPlugin({
        collections: true,
        shorthands: true
      })
    )

    if (process.env.BUILD_MODE === 'component') {
      const nodeExternals = require('webpack-node-externals')
      config.externals = config.externals || {} // for webpack inspect
      config.externals['element-ui'] = 'ELEMENT'
      config.externals = [
        config.externals,
        nodeExternals({
          whitelist: [/^@babel/]
        })
      ]
    }

    const version = process.env.VERSION || require('./package.json').version
    const banner = `Vue Listview v${version}`
    const webpack = require('webpack')
    config.plugins.push(new webpack.BannerPlugin(banner))
  },

  devServer: {
    before: require('./tests/mock-api')
  }
}
