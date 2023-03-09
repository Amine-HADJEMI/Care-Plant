
const nodemailer = require('nodemailer');
const Database = require("../models/database");
const db = Database.db
const randomstring = require('randomstring');
const functionsUtils = require('../utils/functions')
const Status = require("../utils/status")
const bcrypt = require("bcrypt");

async function changePassword(req, res){
  const { email, confirmCode, newPassword, confirmPassword } = req.body;
  
  if (!email || !confirmCode || !newPassword || !confirmPassword) {
    return res.status(200).send({ message: 'Tous les champs sont requis' });
  }

  if (newPassword !== confirmPassword) {
    return res.status(200).send({ message: 'Les mots de passe ne correspondent pas' });
  }

  try{
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(newPassword, saltRounds);
    db.get('SELECT email FROM password_reset_codes WHERE email = ? AND code = ?', [email, confirmCode], (err, row) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ message: 'Erreur du serveur' });
      }
  
      if (!row) {
        return res.status(200).send({ message: 'Code de confirmation incorrect' });
      }
  
  
      db.run('UPDATE users SET password = ? WHERE email = ?', [hashPassword, email], (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send({ message: 'Erreur du serveur' });
        }
        return res.status(201).send({ message: 'Mot de passe modifié avec succès', status: Status.UPDATE_PASSWORD_SUCCESSFULLY});
      });
    });  
  } catch(e){
    console.log(e)
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

        const existingRow = db.prepare('SELECT * FROM password_reset_codes WHERE email = ?').get(userEmail);

        if (existingRow) {
          // Si une ligne avec cet e-mail existe déjà, mettre à jour le code correspondant
          db.prepare('UPDATE password_reset_codes SET code = ? WHERE email = ?').run(verificationCode, userEmail);
        } else {
          // Sinon, insérer une nouvelle ligne avec l'e-mail et le code
          db.prepare('INSERT INTO password_reset_codes (email, code) VALUES (?, ?)').run(userEmail, verificationCode);
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