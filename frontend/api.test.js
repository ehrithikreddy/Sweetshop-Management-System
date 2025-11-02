const request = require("supertest");
const app = require("./app");
const db = require("./db");

beforeAll(async () => {
  await db.run(
    "DELETE FROM users; DELETE FROM sweets;"
  );
});

describe("Sweet Shop Management System API Tests", () => {
  let token;

  test("should register a new user", async () => {
    const res = await request(app)
      .post("/register")
      .send({
        email: "test@example.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User registered successfully");
  });

  test("should log in and return a JWT token", async () => {
    const res = await request(app)
      .post("/login")
      .send({
        email: "test@example.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  test("should add a sweet when authorized", async () => {
    const res = await request(app)
      .post("/sweets")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Gummy Bears",
        category: "Candy",
        price: 1.5,
        quantity: 10,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Sweet added successfully");
  });

  test("should retrieve all sweets", async () => {
    const res = await request(app).get("/sweets");

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("should purchase a sweet and decrease stock", async () => {
    const res = await request(app)
      .post("/purchase/1")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Sweet purchased successfully");
  });
});

afterAll(async () => {
  await db.close();
});
