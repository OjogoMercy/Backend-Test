const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
  override: true,
});
console.log("ALL ENV VARS from the test env file");
