// jest.config.js
module.exports = {
  testEnvironment: "node",
  testTimeout: 15000,
  setupFiles: ["./src/testing/setupEnv.js"],
  setupFilesAfterEnv: ["./src/testing/setup.js"],
  globalSetup: "./src/testing/globalSetup.js",
};
