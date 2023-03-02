const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3");
const bcrypt = require('bcrypt');
const cors = require("cors");
const { body, validationResult } = require('express-validator');

const app = express();
const port = 3002;

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
// const express = require('express');
// const bcrypt = require('bcrypt');
// const { body, validationResult } = require('express-validator');

// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('mydatabase.db');

// const app = express();
// app.use(express.json());

// Validation des données pour la création d'un utilisateur
const userValidationRules = [
  body('username').not().isEmpty().withMessage('Le nom d\'utilisateur est obligatoire'),
  body('name').not().isEmpty().withMessage('Le nom est obligatoire'),
  body('email').isEmail().withMessage('Le format de l\'email est invalide'),
  body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères')
];

// Middleware de validation des données
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
  return res.status(422).json({ errors: extractedErrors });
};

// Middleware de hachage de mot de passe
const hashPassword = async (req, res, next) => {
  const { password } = req.body;
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    next();
  } catch (err) {
    return res.status(500).json({ message: 'Erreur de hachage du mot de passe' });
  }
};

// Route de création d'un utilisateur
app.post('/users', userValidationRules, validate, hashPassword, (req, res) => {
  const { username, name, email, password } = req.body;

  const stmt = db.prepare(
    'INSERT INTO users (username, name, email, password) VALUES (?, ?, ?, ?)'
  );
  stmt.run(username, name, email, password, function(err) {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'utilisateur' });
    }
    res.status(201).send('Utilisateur créé avec succès');
  });
});

// Route de connexion
app.post('/login', [
  body('email').isEmail().withMessage('Le format de l\'email est invalide'),
  body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères')
], validate, (req, res) => {
  const { email, password } = req.body;

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur de base de données' });
    }

    if (!row) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }

    const passwordHash = row.password;
    const isPasswordValid = await bcrypt.compare(password, passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    res.json({ message: 'Authentification réussie' });
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