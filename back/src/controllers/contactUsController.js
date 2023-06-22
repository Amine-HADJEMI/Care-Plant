const nodemailer = require('nodemailer');

async function sendEmail(req, res) {
  const { name, email, message } = req.body;

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
    to: 'carePlant20@outlook.com', // Modifier l'adresse de destination si nécessaire
    subject: 'Nouveau message de contact',
    text: `Nom: ${name}\nE-mail: ${email}\nMessage: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'E-mail envoyé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'envoi de l\'e-mail' });
  }
}

module.exports = {
  sendEmail
};
