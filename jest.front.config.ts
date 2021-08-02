import { defaults } from 'jest-config';

module.exports = {
  setupFilesAfterEnv: ['jest-plugin-context/setup', '../jest.setup.ts'],
  rootDir: 'src',
  testRegex: '.*\\.test\\.(ts|tsx)$',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1',
  },
  globals: {
    'process.env.NODE_ENV': 'test',
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
};
