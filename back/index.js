const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3");
const bcrypt = require('bcrypt');
const cors = require("cors");

const app = express();
const port = 3000;

// Configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// Initialize SQLite database
const db = new sqlite3.Database("database.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the database.");
});

// Démarrage du serveur
app.listen(port, () => {
  console.log("Serveur démarré (http://localhost:3000/) ");
});

// GET /
app.get("/", (req, res) => {
  res.send("Bonjour le monde...");
});

// GET request to retrieve all users from the database
app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(rows);
  });
});

// POST request to insert a new user into the database
app.post('/users', (req, res) => {
  // Hash the password
  const password = req.body.password;
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, function(err, hash) {
    // Insert the new user into the database
    console.log('req.body.userName',req.body)
    if(req.body.username){
      const stmt = db.prepare(
        'INSERT INTO users (userName, name, email, password) VALUES (?, ?, ?, ?)'
      );
      stmt.run(req.body.username, req.body.name, req.body.email, req.body.password);
      stmt.finalize();
      res.status(201).send('User created successfully');
    } else {
      res.status(400).send('Please complete the data');
    }
  });
});

// DELETE request to delete a user from the database
app.delete('/users/:userName', (req, res) => {
  db.run(`DELETE FROM users WHERE userName = ?`, req.params.userName, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send(`User with userName ${req.params.userName} deleted`);
  });
});
// PUT request to modif a user from the database
app.put('/users/:userName', (req, res) => {
  const { name, email, password } = req.body;
  const { userName } = req.params;
  db.run(`UPDATE users SET name = ?, email = ?, password = ? WHERE userName = ?`, [ userName, name, email, password], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error updating user' });
    }
    res.json({ message: 'User updated successfully' });
  });
});