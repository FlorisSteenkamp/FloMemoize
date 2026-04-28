
const esModules = [
    
].join('|');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    testEnvironment: 'node',
    resolver: "jest-ts-webcompat-resolver",
    testMatch: [ "**/__tests__/**/*.spec.ts"],
    collectCoverage: false,  // Make true again!
    coverageProvider: 'v8',
    testTimeout: 15000,
    transform: {
        "^.+\\.(t|j)sx?$": "@swc/jest"
    },
    transformIgnorePatterns: [
        `/node_modules/(?!${esModules})`
    ]
};