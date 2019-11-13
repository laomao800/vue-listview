module.exports = {
  root: true,
  env: {
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  rules: {
    // Only allow debugger in development
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-debugger': process.env.PRE_COMMIT ? 'error' : 'off',
    // Only allow `console.log` in development
    'no-console': process.env.PRE_COMMIT
      ? ['error', { allow: ['warn', 'error'] }]
      : 'off'
  },
  overrides: [
    {
      files: ['tests/unit/specs/**/*.unit.js'],
      env: { jest: true },
      globals: {
        mount: false,
        shallowMount: false,
        shallowMountView: false,
        createComponentMocks: false,
        createModuleStore: false
      }
    }
  ]
}
