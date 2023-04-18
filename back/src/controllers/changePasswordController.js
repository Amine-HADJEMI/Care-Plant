
const nodemailer = require('nodemailer');
const Database = require("../models/database");
// const db = Database.db
const randomstring = require('randomstring');
const Status = require("../utils/status")
const bcrypt = require("bcrypt");
const { PasswordResetCode, User, sequelize } = require('../models/database'); 

sequelize.sync().then(() => {
  console.log('Models synchronized with database in changePasswordController');
});

async function changePassword(req, res){
  const { email, confirmCode, newPassword, confirmPassword } = req.body;
  
  if (!email || !confirmCode || !newPassword || !confirmPassword) {
    return res.status(200).send({ message: 'Tous les champs sont requis' });
  }

  if (newPassword !== confirmPassword) {
    return res.status(200).send({ message: 'Les mots de passe ne correspondent pas' });
  }
  
  try {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(newPassword, saltRounds);
    
    // Rechercher le code de réinitialisation de mot de passe correspondant à l'email et au code de confirmation spécifiés
    const code = await PasswordResetCode.findOne({
      where: {
        email: email,
        code: confirmCode
      }
    });
  
    if (!code) {
      return res.status(200).send({ message: 'Code de confirmation incorrect' });
    }
  
    // Mettre à jour le mot de passe de l'utilisateur correspondant à l'email spécifié
    const user = await User.update({
      password: hashPassword
    }, {
      where: {
        email: email
      }
    });
  
    return res.status(201).send({ message: 'Mot de passe modifié avec succès', status: Status.UPDATE_PASSWORD_SUCCESSFULLY});
  
  } catch (e) {
    console.log(e)
    return res.status(500).send({ message: 'Erreur du serveur' });
  }  

}

async function sendConfirmationEmail(req, res){
  const userEmail = req.body.email;

  // Générer un code aléatoire de 6 chiffres
  const verificationCode = randomstring.generate({
    length: 6,
    charset: 'numeric'
  });

  // Configuration de l'envoi d'e-mail avec Nodemailer
  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
        user: 'carePlant20@outlook.com',
        pass: 'epsi@care2023'
    }
  });

  const mailOptions = {
    from: 'carePlant20@outlook.com',
    to: userEmail,
    subject: 'Code de vérification pour réinitialisation de mot de passe',
    text: `Voici votre code de vérification : ${verificationCode}`
  };

  const existingUser = await User.findOne({
    where: { email: userEmail }
  });

  // const existingUser = db.all('SELECT * FROM users WHERE email = ?', [email])
  const user = existingUser[0]
  
  if (user) {
    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Une erreur est survenue lors de l\'envoi de l\'e-mail');
      } else {
        console.log('E-mail envoyé : ' + info.response);

        const existingRows = await PasswordResetCode.findAll({
          where: { email: userEmail }
        });
        
        const existingRow = existingRows[0];
        
        if (existingRow) {
          // Si une ligne avec cet e-mail existe déjà, mettre à jour le code correspondant
          await PasswordResetCodes.update({ code: verificationCode }, { where: { email: userEmail }});
        } else {
          // Sinon, insérer une nouvelle ligne avec l'e-mail et le code
          await PasswordResetCode.create({ email: userEmail, code: verificationCode });
        }   

        res.status(200).send({message: 'E-mail envoyé avec succès', status: Status.MAIL_SENDED_SUCCESSFULLY });
      } 
    });
  }
  else {
    res.status(200).send({message: "Votre E-mail n'existe pas", status: Status.UNKNOWN_USER})
  }
}

module.exports = {
  changePassword,
  sendConfirmationEmail
};