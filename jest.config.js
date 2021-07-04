module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  setupFiles: ['<rootDir>/tests/unit/setup'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less)$': '<rootDir>/tests/unit/__mocks__/styleMock.js',
  },
  coverageDirectory: '<rootDir>/tests/unit/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,ts,vue}',
    '!src/index.ts',
    '!src/index.component.ts',
    '!src/importElementUI.ts',
  ],
}
