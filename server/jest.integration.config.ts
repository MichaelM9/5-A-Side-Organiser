const config = {
  globalSetup: "./test-utils/global-setup.js",
  globalTeardown: "./test-utils/global-teardown.js",
  clearMocks: true,
  testTimeout: 25000,
  testEnvironment: "node",
  preset: "ts-jest",
};

export default config;
