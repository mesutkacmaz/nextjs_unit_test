import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",

  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/out/**",
    "!**/build/**",
    "!**/next-env.d.ts",
    "!**/jest.config.ts",
    "!**/jest.setup.ts",
    "!**/__test__/**",
    "!**/coverage/**",
    "!**/public/**",
    "!**/next.config.ts",
    "!**/app/layout.tsx",
    "!**/types/**",
  ],
  moduleNameMapper: {
    // ...
    "^@/components/(.*)$": "<rootDir>/components/$1",
  },
};

export default createJestConfig(config);
