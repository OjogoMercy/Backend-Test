// This runs in the same process as your tests, before any module loads
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });