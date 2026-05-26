const request = require("supertest");
const app = require("../../server.js");
const prisma = require("../../prismaClient.js");
// Test data we'll reuse
const testUser = {
  userName: "Mercy Ojogo",
  email: "mercy@test.com",
  password: "password123",
};

// Clean users before each test so they don't interfere
beforeEach(async () => {
  await prisma.growthRecord.deleteMany();
  await prisma.immunisation.deleteMany();
  await prisma.child.deleteMany();
  await prisma.user.deleteMany();
});

describe("POST /register", () => {
  it("should register a new user and return a token", async () => {
    const res = await request(app).post("/register").send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.email).toBe(testUser.email);
    expect(res.body.user).not.toHaveProperty("password");
  });

  it("should fail if email is already registered", async () => {
    await request(app).post("/register").send(testUser);

    // Try again with same email
    const res = await request(app).post("/register").send(testUser);

    expect(res.statusCode).toBe(409);
    expect(res.body).toHaveProperty("error");
  });

  it("should fail if email is missing", async () => {
    const res = await request(app)
      .post("/register")
      .send({ userName: "Mercy", password: "password123" });

    expect(res.statusCode).toBe(400);
  });

  it("should fail if password is missing", async () => {
    const res = await request(app)
      .post("/register")
      .send({ userName: "Mercy", email: "mercy@test.com" });

    expect(res.statusCode).toBe(400);
  });

  it("should fail if userName is missing", async () => {
    const res = await request(app)
      .post("/register")
      .send({ email: "mercy@test.com", password: "password123" });

    expect(res.statusCode).toBe(400);
  });

  it("should fail with empty body", async () => {
    const res = await request(app).post("/register").send({});
    expect(res.statusCode).toBe(400);
  });
});

describe("POST /login", () => {
  beforeEach(async () => {
    //  have a registered user ready for login tests
    await request(app).post("/register").send(testUser);
  });

  it("should login and return a token", async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: testUser.email, password: testUser.password });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should fail with wrong password", async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: testUser.email, password: "wrongpassword" });

    expect(res.statusCode).toBe(401);
  });

  it("should fail with unregistered email", async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "ghost@test.com", password: "password123" });

    expect(res.statusCode).toBe(404);
  });

  it("should fail with missing email", async () => {
    const res = await request(app)
      .post("/login")
      .send({ password: "password123" });

    expect(res.statusCode).toBe(400);
  });

  it("should fail with empty body", async () => {
    const res = await request(app).post("/login").send({});
    expect(res.statusCode).toBe(400);
  });
});
