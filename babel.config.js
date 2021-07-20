const plugins = []

if (process.env.BUILD_MODE === 'component') {
  plugins.push([
    'component',
    { libraryName: 'element-ui', styleLibraryName: 'theme-chalk' },
  ])
}

module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins,
}
