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
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins,
  env: {
    test: {
      presets: [
        [
          '@vue/cli-plugin-babel/preset',
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
