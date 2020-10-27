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
    modulePathIgnorePatterns: ['<rootDir>/src/__tests__/util'],
    testMatch: [
        '**/__tests__/**/*.test.{ts,js}?(x)',
    ],
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/src/controllers/**/*.ts'],
    coverageDirectory: '<rootDir>/src/__tests__/coverage',
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    coverageReporters: [
        'text-summary',
        'lcov'
    ],
}