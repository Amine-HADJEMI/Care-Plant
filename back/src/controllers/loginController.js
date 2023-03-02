const bcrypt = require("bcrypt");
const { body, validationResult } = require('express-validator');
const Database = require("../models/database");
const Status = require("../utils/status")

const db = Database.db


async function loginUser(req, res){
  const { email, password } = req.body;

  try {
    await body('email').isEmail().withMessage('Le format de l\'email est invalide').run(req);
    await body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères').run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({ errors: errors.array(), status: Status.INVALID_EMAIL_OR_PASSWORD });
    }

    const existingUser = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM users WHERE email = ?', [email.toLowerCase()], 
        (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });

    const user = existingUser[0]
    if (!user) {
      return res.status(200).json({message: 'Utilisateur non trouvé', status: Status.INVALID_EMAIL_OR_PASSWORD , });
    }

    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(password, passwordHash);

    if (!isPasswordValid) {
      return res.status(200).json({ message: 'Mot de passe incorrect', status: Status.INVALID_EMAIL_OR_PASSWORD });
    }

    res.json({ message: 'Authentification réussie', status: Status.SUCCESS_AUTHENTIFICATION_USER });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur de base de données' });
  }
}

module.exports = {
  loginUser,
};