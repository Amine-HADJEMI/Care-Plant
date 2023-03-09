const request = require("supertest");
const app = require("../routes/loginRoutes");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const bcrypt = require("bcrypt");
const Status = require("../utils/status");

// Définition d'une fonction pour créer une instance de base de données en mémoire
async function createDb() {
  return open({
    filename: ":memory:",
    driver: sqlite3.Database,
  });
}

describe("loginUser", () => {
  let db;
  const existingUser = {
    userName: "johndoe",
    name: "John Doe",
    email: "johndoe@example.com",
    password: bcrypt.hashSync("password", 10),
  };

  // Avant chaque test, on crée une nouvelle instance de base de données en mémoire
  beforeEach(async () => {
    db = await createDb();
    // On crée la table users
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        userName TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL
      )
    `);
    // On insère un utilisateur pour les tests
    await db.run(
      "INSERT INTO users (userName, name, email, password) VALUES (?, ?, ?, ?)",
      [
        existingUser.userName,
        existingUser.name,
        existingUser.email,
        existingUser.password,
      ]
    );
  });

  // Après chaque test, on ferme la connexion à la base de données
  afterEach(() => {
    db.close();
  });

  describe("POST /login", () => {
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

    test("renvoie une réponse réussie si l'authentification est réussie", async () => {
      const response = await request(app).post("/login").send({
        email: "johndoe@example.com",
        password: existingUser.password,
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Authentification réussie",
        status: Status.SUCCESS_AUTHENTIFICATION_USER,
      });
    });
  });
});
