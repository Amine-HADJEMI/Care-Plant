const bcrypt = require("bcrypt");
const Database = require("../models/database");

const db = Database.db;

async function getAllUsers(req, res) {
  try {
    const rows = await new Promise((resolve, reject) => {
      db.all("SELECT * FROM users", (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

async function createUser(req, res) {
  try {
    const password = req.body.password;
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    if (req.body.userName && req.body.email) {
      const existingUsers = await new Promise((resolve, reject) => {
        db.all(
          "SELECT * FROM users WHERE userName = ? OR email = ?",
          [req.body.userName, req.body.email],
          (err, rows) => {
            if (err) {
              reject(err);
            }
            resolve(rows);
          }
        );
      });

      if (existingUsers.length > 0) {
        res.status(200).send("User already exists");
      } else {
        const stmt = db.prepare(
          "INSERT INTO users (userName, name, email, password) VALUES (?, ?, ?, ?)"
        );
        stmt.run(req.body.userName, req.body.name, req.body.email, hash);
        stmt.finalize();
        res.status(201).send("User created successfully");
      }
    } else {
      res.status(200).send("Please complete the data");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
}

async function updateUser(req, res) {
  const { name, email, password } = req.body;
  const { userName } = req.params;
  db.run(
    `UPDATE users SET name = ?, email = ?, password = ? WHERE userName = ?`,
    [userName, name, email, password],
    (err) => {
      if (err) {
        return res.status(500).send("Error updating user");
      }
      res.status(200).send("User updated successfully");
    }
  );
}

async function deleteUser(req, res) {
  try {
    const existingUser = await new Promise((resolve, reject) => {
      db.all(
        "SELECT * FROM users WHERE userName = ?",
        req.params.userName,
        (err, rows) => {
          if (err) {
            reject(err);
          }
          resolve(rows);
        }
      );
    });

    if (existingUser.length === 0) {
      return res
        .status(404)
        .send(`The user with userName ${req.params.userName} does not exist`);
    }

    db.run(
      `DELETE FROM users WHERE userName = ?`,
      req.params.userName,
      function (err) {
        if (err) {
          return res.status(500).send(err);
        }
        console.log("existingUser.length");

        res
          .status(200)
          .send(`User with userName ${req.params.userName} deleted`);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting user");
  }
}

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
