const plugins = []

if (process.env.BUILD_MODE !== 'component') {
  plugins.push([
    'component',
    {
      libraryName: 'element-ui',
      styleLibraryName: 'theme-chalk'
    }
  ])
}

module.exports = {
  presets: ['@vue/app'],
  plugins,
  env: {
    test: {
      presets: [
        [
          '@vue/app',
          {
            // Enable Babel's polyfills for Jest tests
            useBuiltIns: 'usage',
            // Use CommonJS modules for Jest tests
            modules: 'commonjs'
          }
        ]
      ],
      plugins: ['require-context-hook']
    }
  }
}
