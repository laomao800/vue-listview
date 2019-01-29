const plugins = [
  // Support async/await
  // https://babeljs.io/docs/plugins/transform-runtime/
  ['@babel/transform-runtime', { helpers: true, regenerator: true }]
]

if (
  process.env.NODE_ENV === 'production' &&
  process.env.BUILD_MODE !== 'component'
) {
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
