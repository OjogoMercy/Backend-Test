console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("TEST_DATABASE_URL:");
const prisma = require("../../prismaClient.js");

beforeAll(async () => {
  // Clean database before all tests run
  await prisma.growthRecord.deleteMany();
  await prisma.immunisation.deleteMany();
  await prisma.child.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  // Clean up after all tests and disconnect
  await prisma.growthRecord.deleteMany();
  await prisma.immunisation.deleteMany();
  await prisma.child.deleteMany();
  await prisma.user.deleteMany();
  await prisma.$disconnect();
});
