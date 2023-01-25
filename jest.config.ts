import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  roots: ["<rootDir>./src/tests/"],
  testMatch: ["**/*.test.ts"],
  clearMocks: true,
  coverageProvider: "v8",
  preset: "ts-jest/presets/js-with-ts",
  setupFilesAfterEnv: ["./src/tests/setup.ts"],
  collectCoverageFrom: ["./src/tests/*.ts"],
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    '^.+\\.m?[tj]sx?$': "ts-jest",
    '^.+\\.tsx?$': [
      'ts-jest',
      {
      },
    ],
  },
}
export default jestConfig
