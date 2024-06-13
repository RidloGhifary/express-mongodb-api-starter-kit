const request = require("supertest");
const app = require("../src/app"); // Adjust the path to your server file
const User = require("../src/models/user"); // Adjust the path to your user model
const mongoose = require("mongoose");
const config = require("config");
const jwt = require("jsonwebtoken");

beforeAll(async () => {
  // Connect to the test database before running tests
  await mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log("Database connected"))
    .catch((error) => console.log("Database got some issues", error));
});

afterEach(async () => {
  // Clean up the users collection after each test
  await User.deleteMany({});
});

afterAll(async () => {
  // Disconnect from the database after all tests
  await mongoose.disconnect();
});

describe("User API", () => {
  describe("POST /api/users/register", () => {
    it("should register a new user", async () => {
      const newUser = {
        name: "Test User",
        email: "testuser@example.com",
        password: "password123",
      };

      const res = await request(app).post("/api/users/register").send(newUser);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("token");
    });

    it("should not register a user with an existing email", async () => {
      const user = new User({
        name: "Test User",
        email: "testuser@example.com",
        password: "password123",
      });

      await user.save();

      const newUser = {
        name: "Another User",
        email: "testuser@example.com",
        password: "password123",
      };

      const res = await request(app).post("/api/users/register").send(newUser);

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("message", "User already exists");
    });
  });

  describe("POST /api/users/login", () => {
    it("should log in an existing user", async () => {
      const user = new User({
        name: "Test User",
        email: "testuser@example.com",
        password: "password123",
      });

      await user.save();

      const loginUser = {
        email: "testuser@example.com",
        password: "password123",
      };

      const res = await request(app).post("/api/users/login").send(loginUser);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("token");
    });

    it("should not log in a user with wrong credentials", async () => {
      const loginUser = {
        email: "testuser@example.com",
        password: "wrongpassword",
      };

      const res = await request(app).post("/api/users/login").send(loginUser);

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("message", "Invalid credentials");
    });
  });

  describe("GET /api/users/profile", () => {
    it("should get the user profile", async () => {
      const user = new User({
        name: "Test User",
        email: "testuser@example.com",
        password: "password123",
      });

      await user.save();

      const payload = { user: { id: user.id } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const res = await request(app)
        .get("/api/users/profile")
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("name", "Test User");
      expect(res.body).toHaveProperty("email", "testuser@example.com");
    });

    it("should not get the user profile without a token", async () => {
      const res = await request(app).get("/api/users/profile");

      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty(
        "message",
        "No token, authorization denied"
      );
    });
  });
});
