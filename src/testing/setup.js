console.log("Setup Hook Initializing...");
console.log("NODE_ENV active status:", process.env.NODE_ENV);
console.log("DATABASE_URL present:", !!process.env.DATABASE_URL);
console.log("TEST_DATABASE_URL present:", !!process.env.TEST_DATABASE_URL);
console.log("NODE_ENV:", process.env.NODE_ENV);

const prisma = require("../../prismaClient.js");

beforeAll(async () => {
  try {
    await prisma.growthRecord.deleteMany();
    await prisma.immunisation.deleteMany();
    await prisma.child.deleteMany();
    await prisma.user.deleteMany();
    console.log("Test database cleaned successfully.");
  } catch (error) {
    console.error("Critical error cleaning database in beforeAll hook:", error);
    throw error;
  }
});

afterAll(async () => {
  try {
    await prisma.growthRecord.deleteMany();
    await prisma.immunisation.deleteMany();
    await prisma.child.deleteMany();
    await prisma.user.deleteMany();
    console.log("Post-test database cleanup complete.");
  } catch (error) {
    console.error(
      "Warning: Post-test table cleanup encountered errors:",
      error,
    );
  } finally {
    await prisma.$disconnect();
    console.log("🔌 Prisma engine disconnected safely.");
  }
});
