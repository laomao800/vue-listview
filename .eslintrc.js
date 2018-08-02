module.exports = {
  root: true,
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#bulb-rules
    'plugin:vue/recommended',
    // https://github.com/standard/standard/blob/master/docs/RULES-zhcn.md
    'standard'
  ],
  rules: {
    // Turn off 'space-before-function-paren' for prettier
    // https://github.com/prettier/prettier/issues/3847
    'space-before-function-paren': 0,
    // Only allow debugger in development
    'no-debugger': process.env.PRE_COMMIT ? 'error' : 'off',
    // Only allow `console.log` in development
    'no-console': process.env.PRE_COMMIT
      ? ['error', { allow: ['warn', 'error'] }]
      : 'off'
  },
  overrides: [
    {
      files: ['src/**/*', 'dev/**/*', 'tests/unit/**/*', 'tests/e2e/**/*'],
      excludedFiles: 'app.config.js',
      parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
      },
      env: {
        browser: true
      }
    },
    {
      files: ['**/*.unit.js'],
      parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
      },
      env: {
        jest: true
      },
      globals: {
        mount: false,
        shallowMount: false,
        createComponentMocks: false,
        createModuleStore: false
      }
    }
  ]
}
