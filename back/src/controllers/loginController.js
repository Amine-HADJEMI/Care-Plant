const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const Status = require("../utils/status");
const { User } = require("../models/database");

// async function loginUser(req, res) {
//   const { email, password } = req.body;

//   try {
//     await body("email")
//       .isEmail()
//       .withMessage("Le format de l'email est invalide")
//       .run(req);
//     await body("password")
//       .isLength({ min: 8 })
//       .withMessage("Le mot de passe doit contenir au moins 8 caractères")
//       .run(req);
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(200).json({
//         errors: errors.array(),
//         status: Status.INVALID_EMAIL_OR_PASSWORD,
//       });
//     }

//     const existingUser = await User.findAll({
//       where: { email: email.toLowerCase() },
//     });

//     const user = existingUser[0];
//     if (!user) {
//       return res.status(200).json({
//         message: "Utilisateur non trouvé",
//         status: Status.INVALID_EMAIL_OR_PASSWORD,
//       });
//     }

//     const passwordHash = user.password;
//     const isPasswordValid = await bcrypt.compare(password, passwordHash);

//     if (!isPasswordValid) {
//       return res.status(200).json({
//         message: "Mot de passe incorrect",
//         status: Status.INVALID_EMAIL_OR_PASSWORD,
//       });
//     }

//     //const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);

//     res.json({
//       message: "Authentification réussie",
//       status: Status.SUCCESS_AUTHENTIFICATION_USER,
//       user: {
//         firstName: user.firstName,
//         email: user.email,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Erreur de base de données" });
//   }
// }
async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    await body("email")
      .isEmail()
      .withMessage("Le format de l'email est invalide")
      .run(req);
    await body("password")
      .isLength({ min: 8 })
      .withMessage("Le mot de passe doit contenir au moins 8 caractères")
      .run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({
        errors: errors.array(),
        status: Status.INVALID_EMAIL_OR_PASSWORD,
      });
    }

    const existingUser = await User.findAll({
      where: { email: email.toLowerCase() },
    });

    const user = existingUser[0];
    if (!user) {
      return res.status(200).json({
        message: "Utilisateur non trouvé",
        status: Status.INVALID_EMAIL_OR_PASSWORD,
      });
    }

    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(password, passwordHash);

    if (!isPasswordValid) {
      return res.status(200).json({
        message: "Mot de passe incorrect",
        status: Status.INVALID_EMAIL_OR_PASSWORD,
      });
    }

    // Génération du token JWT
    const token = jwt.sign({ userId: user.id }, "motdepass");
    await User.update({ token }, { where: { id: user.id } });
    console.log(token);
    res.json({
      message: "Authentification réussie",
      status: Status.SUCCESS_AUTHENTIFICATION_USER,
      user: {
        firstName: user.firstName,
        email: user.email,
      },
      token: token, // Ajout du token dans la réponse
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur de base de données" });
  }
}
module.exports = {
  loginUser,
};
