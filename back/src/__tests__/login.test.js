const request = require("supertest");
const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const sqlite3 = require("sqlite3").verbose();
const Status = require("../utils/status");

const app = express();

const db = new sqlite3.Database(":memory:");
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      userName TEXT PRIMARY KEY,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    );
  `);
  const passwordHash = bcrypt.hashSync("password", 10);
  db.run(
    `
    INSERT INTO users (userName, name, email, password)
    VALUES ('john_doe','John Doe', 'johndoe@example.com', ?)
  `,
    passwordHash
  );
});

app.use(express.json());

app.post(
  "/login",
  [
    body("email").isEmail().withMessage("Le format de l'email est invalide"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Le mot de passe doit contenir au moins 6 caractères"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(200).json({
          errors: errors.array(),
          status: Status.INVALID_EMAIL_OR_PASSWORD,
        });
      }

      const { email, password } = req.body;

      const existingUser = await new Promise((resolve, reject) => {
        db.all(
          "SELECT * FROM users WHERE email = ?",
          [email.toLowerCase()],
          (err, rows) => {
            if (err) {
              reject(err);
            }
            resolve(rows);
          }
        );
      });

      const user = existingUser[0];
      if (!user) {
        return res.status(200).json({
          message: "Utilisateur non trouvé",
          status: Status.INVALID_EMAIL_OR_PASSWORD,
        });
      }

      const passwordHash = user.password;
      const isPasswordValid = await bcrypt.compare(password, passwordHash);

      if (!isPasswordValid) {
        return res.status(200).json({
          message: "Mot de passe incorrect",
          status: Status.INVALID_EMAIL_OR_PASSWORD,
        });
      }

      res.json({
        message: "Authentification réussie",
        status: Status.SUCCESS_AUTHENTIFICATION_USER,
        user: {
          name: user.name,
          email: user.email,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur de base de données" });
    }
  }
);

describe("POST /login", () => {
  test("should authenticate user with valid credentials", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "johndoe@example.com", password: "password" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Authentification réussie",
      status: Status.SUCCESS_AUTHENTIFICATION_USER,
      user: {
        name: "John Doe",
        email: "johndoe@example.com",
      },
    });
  });

  it("devrait renvoyer une erreur si l'email est invalide", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "invalidemail", password: "password" });
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(Status.INVALID_EMAIL_OR_PASSWORD);
    expect(response.body.errors).toContainEqual({
      value: "invalidemail",
      msg: "Le format de l'email est invalide",
      param: "email",
      location: "body",
    });
  });

  it("devrait renvoyer une erreur si le mot de passe est trop court", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "johndoe@example.com", password: "short" });
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(Status.INVALID_EMAIL_OR_PASSWORD);
    expect(response.body.errors).toContainEqual({
      value: "short",
      msg: "Le mot de passe doit contenir au moins 6 caractères",
      param: "password",
      location: "body",
    });
  });

  it("devrait renvoyer une erreur si l'utilisateur n'existe pas", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "nonexistent@example.com", password: "password" });
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe(Status.INVALID_EMAIL_OR_PASSWORD);
    expect(response.body.message).toBe("Utilisateur non trouvé");
  });

  it("devrait renvoyer une erreur si le mot de passe est incorrect", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "johndoe@example.com", password: "mauvaismotdepasse" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: "Mot de passe incorrect",
      status: Status.INVALID_EMAIL_OR_PASSWORD,
    });
  });
});
