const path = require("path");
const dotenv = require("dotenv");

module.exports = async () => {
  const envPath = path.resolve(__dirname, "../../.env");
  const result = dotenv.config({ path: envPath });
  
  if (result.error) {
    console.error("Failed to load .env from:", envPath);
    throw result.error;
  }

  process.env.NODE_ENV = "test";

  if (!process.env.TEST_DATABASE_URL) {
    throw new Error(
      "TEST_DATABASE_URL is missing from your .env file. Add it before running tests."
    );
  }

  console.log(".env loaded successfully from:", envPath);
};