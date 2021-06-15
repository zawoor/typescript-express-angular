const { pathsToModuleNameMapper } = require('ts-jest/utils');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src/api'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  }
};
