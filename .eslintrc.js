module.exports = {
  root: true,
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#bulb-rules
    'plugin:vue/recommended',
    '@vue/standard'
  ],
  rules: {
    // Turn off 'space-before-function-paren' for prettier
    // https://github.com/prettier/prettier/issues/3847
    'space-before-function-paren': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 2,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    'vue/multiline-html-element-content-newline': 'error',
    'vue/no-spaces-around-equal-signs-in-attribute': 'error',
    // 'vue/script-indent': ['error', 2, { baseIndent: 0 }],
    'vue/no-unused-components': 0
  },
  overrides: [
    {
      files: ['src/**/*', 'dev/**/*', 'tests/unit/**/*', 'tests/e2e/**/*'],
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
