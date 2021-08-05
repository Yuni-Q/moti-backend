import { defaults } from 'jest-config';

module.exports = {
  setupFilesAfterEnv: ['jest-plugin-context/setup', '../jest.setup.ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1',
    '\\.(gif|png|jpg|svg)$': '<rootDir>/mediaFileTransformer.js',
  },
  globals: {
    'process.env.NODE_ENV': 'test',
    'process.env.TZ': 'Asia/Seoul',
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
};
