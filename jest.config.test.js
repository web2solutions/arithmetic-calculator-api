module.exports = {
  clearMocks: false,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "node",
  verbose: true,
  extensionsToTreatAsEsm: ['.ts'],
  testMatch: [
    "**/tests/**/*.test.ts"
  ],
};