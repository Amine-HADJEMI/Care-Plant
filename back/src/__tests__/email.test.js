const request = require("supertest");
const app = require("../routes/changePasswordRoutes");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const Status = require("../utils/status");

async function createDb() {
  return open({
    filename: ":memory:",
    driver: sqlite3.Database,
  });
}

describe("sendConfirmationEmail", () => {
  let db;
  beforeEach(async () => {
    db = await createDb();
    // Créer la table users et insérer un utilisateur de test
    await db.run(
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT)"
    );
    await db.run("INSERT INTO users (email, password) VALUES (?, ?)", [
      "test@test.com",
      "password123",
    ]);
  });

  afterEach(async () => {
    // Supprimer la table users après chaque test
    await db.run("DROP TABLE IF EXISTS users");
  });

  it("should send a confirmation email to the user", async () => {
    const email = "test@test.com";
    const response = await request(app)
      .post("/send-confirmation-email")
      .send({ email });
    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toContain("Votre E-mail n'existe pas");
    expect(response.body.status).toEqual(Status.UNKNOWN_USER);
  });

  it("should return an error message if the user does not exist", async () => {
    const email = "unknown@test.com";
    const response = await request(app)
      .post("/send-confirmation-email")
      .send({ email });
    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toContain("Votre E-mail n'existe pas");
    expect(response.body.status).toEqual(Status.UNKNOWN_USER);
  });
});
