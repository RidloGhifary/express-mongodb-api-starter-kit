const request = require("supertest");
const app = require("../src/index");

describe("Testing API", () => {
  it("should return Hello World! on / route", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Hello World!" });
  });
});
