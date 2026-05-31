const { PrismaNeon } = require("@prisma/adapter-neon");
const { neonConfig, Pool } = require("@neondatabase/serverless");
const { PrismaClient } = require("@prisma/client");
const ws = require("ws");

neonConfig.webSocketConstructor = ws;

// const connectionString =
//   process.env.NODE_ENV === "test"
//     ? process.env.TEST_DATABASE_URL
//     : process.env.DATABASE_URL;

// if (!connectionString) {
//   throw new Error(
//     `Connection string is undefined! NODE_ENV is: ${process.env.NODE_ENV}`,
//   );
// }
const connectionString =
  process.env.TEST_DATABASE_URL || process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
