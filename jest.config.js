/* eslint-disable @typescript-eslint/no-var-requires */
const random = require('lodash/random')

process.env.MOCK_API_PORT = process.env.MOCK_API_PORT || random(9000, 9999)

module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  setupFiles: ['<rootDir>/tests/unit/setup'],
  globalSetup: '<rootDir>/tests/unit/global-setup',
  globalTeardown: '<rootDir>/tests/unit/global-teardown',
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
    '!src/Listview/index.ts',
    '!src/Listview/migrationMixin.ts',
    '!src/ListviewContainer/index.ts',
  ],
  testURL: `http://localhost:${process.env.MOCK_API_PORT}`,
}
