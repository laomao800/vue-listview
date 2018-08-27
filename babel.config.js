const plugins = [
  // Support async/await
  // https://babeljs.io/docs/plugins/transform-runtime/
  [
    '@babel/transform-runtime',
    { helpers: true, polyfill: false, regenerator: true }
  ]
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
  presets: [
    [
      '@vue/app',
      {
        // Disable Babel's polyfills, replaced by the
        // polyfill.io service in index.html
        useBuiltIns: false
      }
    ]
  ],
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
