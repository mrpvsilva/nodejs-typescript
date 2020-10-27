const { compilerOptions } = require('./tsconfig.json')
const { pathsToModuleNameMapper } = require('ts-jest/utils')

module.exports = {
    roots: [
        '<rootDir>/src'
    ],
    clearMocks: true,
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/src/controllers/**/*.ts'],
    coverageDirectory: '<rootDir>/src/__tests__/coverage',
    coverageReporters: [
        "text-summary",
        "lcov"
    ],
}