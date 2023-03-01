
const nodemailer = require('nodemailer');
const Database = require("../models/database");
const db = Database.db
const randomstring = require('randomstring');
const functionsUtils = require('../utils/functions')
const Status = require("../utils/status")

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

  const existingUser = await new Promise((resolve, reject) => {
    db.all('SELECT * FROM users WHERE email = ?', [userEmail], 
      (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });

  // const existingUser = db.all('SELECT * FROM users WHERE email = ?', [email])
  const user = existingUser[0]
  
  if (user) {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Une erreur est survenue lors de l\'envoi de l\'e-mail');
      } else {
        console.log('E-mail envoyé : ' + info.response);
        
        db.execute('INSERT INTO password_reset_codes (email, code) VALUES (?, ?)', [email, confirmationCode]);

        res.status(200).send('E-mail envoyé avec succès');
      } 
    });
  }
  else {
    res.status(200).send({message: "Votre E-mail n'existe pas", status: Status.UNKNOWN_USER})
  }
}

module.exports = {
  sendConfirmationEmail,
};