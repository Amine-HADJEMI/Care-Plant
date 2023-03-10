const request = require("supertest");
const sqlite3 = require("sqlite3").verbose();
const app = require("../routes/changePasswordRoutes");
const bcrypt = require("bcrypt");
const randomstring = require("randomstring");

describe("Test changePassword function", () => {
  let db;

  beforeAll((done) => {
    db = new sqlite3.Database(":memory:");
    db.run(
      "CREATE TABLE users (email TEXT PRIMARY KEY, password TEXT)",

      (err) => {
        if (err) {
          console.error(err.message);
        }
        const password = bcrypt.hashSync("testPassword", 10);
        db.run(
          `INSERT INTO users (email, password) VALUES (?, ?)`,
          ["test@example.com", password],
          (err) => {
            if (err) {
              console.error(err.message);
            }
            done();
          }
        );
        db.run(`CREATE TABLE password_reset_codes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            code TEXT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
          );`);
      }
    );
  });

  afterAll(() => {
    db.close();
  });

  it("should return an error if required fields are missing", async () => {
    const res = await request(app).post("/change-password").send({});
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Tous les champs sont requis");
  });

  it("should return an error if passwords do not match", async () => {
    const res = await request(app).post("/change-password").send({
      email: "test@example.com",
      confirmCode: "testConfirmCode",
      newPassword: "newPassword",
      confirmPassword: "differentPassword",
    });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Les mots de passe ne correspondent pas");
  });

  it("should return an error if the confirmation code is incorrect", async () => {
    const res = await request(app).post("/change-password").send({
      email: "test@example.com",
      confirmCode: "wrongConfirmCode",
      newPassword: "newPassword",
      confirmPassword: "newPassword",
    });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Code de confirmation incorrect");
  });

  it("should change password successfully", async () => {
    const confirmCode = randomstring.generate(6);
    const newPassword = "newPassword";
    const hashPassword = await bcrypt.hash(newPassword, 10);
    db.run(
      `INSERT INTO password_reset_codes (email, code) VALUES (?, ?)`,
      ["test@example.com", confirmCode],
      (err) => {
        if (err) {
          console.error(err.message);
        }
        request(app)
          .post("/change-password")
          .send({
            email: "test@example.com",
            confirmCode: confirmCode,
            newPassword: newPassword,
            confirmPassword: newPassword,
          })
          .end((err, res) => {
            expect(res.status).toBe(201);
            expect(res.body.message).toBe("Mot de passe modifié avec succès");
            db.get(
              "SELECT password FROM users WHERE email = ?",
              ["test@example.com"],
              (err, row) => {
                expect(row.password).toBe(hashPassword);
              }
            );
          });
      }
    );
  });
});
