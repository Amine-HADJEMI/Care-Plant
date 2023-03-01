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
});


// Create users table
Database.db.run(`CREATE TABLE IF NOT EXISTS users (
    userName TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
)`);

// Create plants table
Database.db.run(`CREATE TABLE IF NOT EXISTS plants (
    userName TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL
)`);

// Create photos table
Database.db.run(`CREATE TABLE IF NOT EXISTS photos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plant_id INTEGER NOT NULL,
    photo BLOB,
    FOREIGN KEY (plant_id) REFERENCES plants(id)
)`);

// Create tips table
Database.db.run(`CREATE TABLE IF NOT EXISTS tips (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plant_id INTEGER NOT NULL,
    tip TEXT NOT NULL,
    FOREIGN KEY (plant_id) REFERENCES plants(id)
)`);

// Create plant_user table
Database.db.run(`CREATE TABLE IF NOT EXISTS plant_user (
    id INTEGER PRIMARY KEY AUTOINCREMENT
)`);


// // insert test data into the users table
// let sql = `INSERT INTO users(userName, name, email, password) VALUES(?,?,?,?)`;

// Database.db.run(sql, ["JDoe", "John Doe", "johndoe@example.com", "password1"], (err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log(`Row has been inserted with rowid ${this.lastID}`);
// });

// Database.db.run(sql, ["JSmith", "Jane Smith", "janesmith@example.com", "password2"], (err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log(`Row has been inserted with rowid ${this.lastID}`);
// });

// Database.db.run(sql, ["BJohnson","Bob Johnson", "bobjohnson@example.com", "password3"], (err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log(`Row has been inserted with rowid ${this.lastID}`);
// });

module.exports = Database;