const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database(
  "./database.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the database.");
  }
);

// Create users table
db.run(`CREATE TABLE IF NOT EXISTS users (
    userName TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
)`);

// Create plants table
db.run(`CREATE TABLE IF NOT EXISTS plants (
    userName TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL
)`);

// Create photos table
db.run(`CREATE TABLE IF NOT EXISTS photos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plant_id INTEGER NOT NULL,
    photo_path TEXT NOT NULL,
    FOREIGN KEY (plant_id) REFERENCES plants(id)
)`);

// Create tips table
db.run(`CREATE TABLE IF NOT EXISTS tips (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plant_id INTEGER NOT NULL,
    tip TEXT NOT NULL,
    FOREIGN KEY (plant_id) REFERENCES plants(id)
)`);

// Create plant_user table
db.run(`CREATE TABLE IF NOT EXISTS plant_user (
    id INTEGER PRIMARY KEY AUTOINCREMENT
)`);


// insert test data into the users table
let sql = `INSERT INTO users(userName, name, email, password) VALUES(?,?,?,?)`;

db.run(sql, ["JDoe", "John Doe", "johndoe@example.com", "password1"], (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log(`Row has been inserted with rowid ${this.lastID}`);
});

db.run(sql, ["JSmith", "Jane Smith", "janesmith@example.com", "password2"], (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log(`Row has been inserted with rowid ${this.lastID}`);
});

db.run(sql, ["BJohnson","Bob Johnson", "bobjohnson@example.com", "password3"], (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log(`Row has been inserted with rowid ${this.lastID}`);
});


