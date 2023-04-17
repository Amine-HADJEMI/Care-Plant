const sqlite3 = require("sqlite3").verbose();

const Database = {};

Database.db = new sqlite3.Database(
  "database.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the database.");
  }
);

Database.db.run(`CREATE TABLE IF NOT EXISTS users (
    userName TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
)`);

Database.db.run(`CREATE TABLE users_backup AS SELECT * FROM users;`);

Database.db.run(`
    CREATE TABLE IF NOT EXISTS messages (
        _id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        user TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`);
Database.db.run(`
    CREATE TABLE IF NOT EXISTS password_reset_codes (
        email VARCHAR(255) NOT NULL,
        code VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (email)
    );`);

Database.db.run(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image BLOB,
    userName TEXT,
    createdAt DATETIME NOT NULL,
    carePlant INTEGER NOT NULL DEFAULT 0 CHECK (carePlant IN (0, 1))
)`);

module.exports = Database;
