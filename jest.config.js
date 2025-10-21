module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/modules"],
  testMatch: ["**/*.test.ts"],
  collectCoverageFrom: [
    "modules/**/*.ts",
    "!modules/**/*.test.ts",
    "!modules/**/*.types.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
};
