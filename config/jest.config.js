module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/../modules", "<rootDir>/../tests"],
  testMatch: [
    "**/tests/**/*.test.ts",
    "**/tests/**/*.test.tsx",
    "**/tests/**/*.spec.ts",
    "**/tests/**/*.spec.tsx",
  ],
  collectCoverageFrom: [
    "../modules/**/*.ts",
    "../modules/**/*.tsx",
    "!../modules/**/tests/**",
    "!../modules/**/*.d.ts",
  ],
  setupFilesAfterEnv: ["<rootDir>/../tests/setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
};
