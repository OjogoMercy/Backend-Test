require("dotenv").config(); // loads .env from project root automatically
process.env.NODE_ENV = "test";

module.exports = {
  testEnvironment: "node",
  testTimeout: 15000,
  setupFilesAfterEnv: ["./src/testing/setup.js"],
};
