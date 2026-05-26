const path = require("path");
console.log("__dirname:", __dirname);
console.log("looking for .env at:", path.resolve(__dirname, ".env"));
console.log("process.cwd():", process.cwd());
const { PrismaNeon } = require("@prisma/adapter-neon");
const { neonConfig, Pool } = require("@neondatabase/serverless");
const { PrismaClient } = require("@prisma/client");
const ws = require("ws");

neonConfig.webSocketConstructor = ws;

const connectionString =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
