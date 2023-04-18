const bcrypt = require("bcrypt");
const { body, validationResult } = require('express-validator');
const Database = require("../models/database");
const Status = require("../utils/status")
const  { User, sequelize }  = require('../models/database'); 

// const db = Database.db

sequelize.sync().then(() => {
  console.log('Models synchronized with database in loginController');
});

async function loginUser(req, res){
  const { email, password } = req.body;

  try {
    await body('email').isEmail().withMessage('Le format de l\'email est invalide').run(req);
    await body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères').run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({ errors: errors.array(), status: Status.INVALID_EMAIL_OR_PASSWORD });
    }

    const existingUser = await User.findAll({ where: { email: email.toLowerCase() } });

    const user = existingUser[0]
    if (!user) {
      return res.status(200).json({message: 'Utilisateur non trouvé', status: Status.INVALID_EMAIL_OR_PASSWORD , });
    }

    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(password, passwordHash);

    if (!isPasswordValid) {
      return res.status(200).json({ message: 'Mot de passe incorrect', status: Status.INVALID_EMAIL_OR_PASSWORD });
    }

    res.json({ 
      message: 'Authentification réussie', 
      status: Status.SUCCESS_AUTHENTIFICATION_USER, 
      user: {
        userName: user.userName,
        name: user.name,
        email: user.email
      } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur de base de données' });
  }
}

module.exports = {
  loginUser,
};