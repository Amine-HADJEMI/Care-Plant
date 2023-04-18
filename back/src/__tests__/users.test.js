const request = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../routes/userRoutes");
const Database = require("../models/database");
const db = Database.db;

// Test de la route GET /users
describe("Test de l'API", () => {
  it('Devrait renvoyer un message "Welcome to BACK -- CarePlant..."', async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual("Welcome to BACK -- CarePlant...");
  });
});

describe("GET /users", () => {
  it("Devrait renvoyer une liste de tous les utilisateurs", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});

// Test des routes POST/PUT/DELETE
describe("TEST API", () => {
  let existingUser;
  let newUser;

  beforeAll(async () => {
    await db.run(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, userName TEXT, name TEXT, email TEXT, password TEXT)"
    );

    const saltRounds = 10;
    const password = "password";
    const hash = await bcrypt.hash(password, saltRounds);

    // create an existing user
    existingUser = {
      userName: "existingUser",
      name: "Existing User",
      email: "existinguser@example.com",
      password: hash,
    };
    await db.run(
      "INSERT INTO users (userName, name, email, password) VALUES (?, ?, ?, ?)",
      [
        existingUser.userName,
        existingUser.name,
        existingUser.email,
        existingUser.password,
      ]
    );

    // create a new user
    newUser = {
      userName: "newUser",
      name: "New User",
      email: "newuser@example.com",
      password: "password",
    };
  });

  afterAll(async () => {
    await db.run("DROP TABLE IF EXISTS users");
    await db.close();
  });
  //Creation user
  it("should create a new user", async () => {
    const response = await request(app)
      .post("/create-user")
      .send(newUser)
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(201);
    expect(response.text).toBe("User created successfully");
  });

  it("should not create a user with the same userName or email", async () => {
    const response = await request(app)
      .post("/create-user")
      .send(existingUser)
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("User already exists");
  });

  it("should not create a user with incomplete data", async () => {
    const response = await request(app)
      .post("/create-user")
      .send({
        name: "New User",
        email: "newuser@example.com",
        password: "password",
      })
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Please complete the data");
  });
  // Mise à jour user
  it("should update an existing user", async () => {
    const response = await request(app)
      .put(`/user/${existingUser.userName}`)
      .send({ name: "Updated User" })
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("User updated successfully");
  });
  //Suppresion user
  it("should delete an existing user", async () => {
    const response = await request(app)
      .delete(`/user/${existingUser.userName}`)
      .set("Accept", "application/json");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe(
      `User with userName ${existingUser.userName} deleted`
    );
  });
});
