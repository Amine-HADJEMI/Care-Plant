const request = require("supertest");
const app = require("../routes/userRoutes");
const bcrypt = require("bcrypt");

describe("Test de l'API", () => {
  it('Devrait renvoyer un message "Welcome to BACK -- CarePlant..."', async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual("Welcome to BACK -- CarePlant...");
  });
});

// Test de la route GET /users
describe("GET /users", () => {
  it("Devrait renvoyer une liste de tous les utilisateurs", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});
//Test de la route POST /create-user
describe("createUser", () => {
  it("creates a user successfully", async () => {
    const saltRounds = 10;
    const password = await bcrypt.hash("password", saltRounds);
    const user = {
      userName: "1",
      name: "New User",
      email: "new@example.com",
      password: password,
    };
    const response = await request(app)
      .post("/create-user")
      .send(user)
      .expect(201)
      .expect("User created successfully");
    expect(response.body).toMatchObject({});
  });
});
