// const bcrypt = require("bcrypt");
const Database = require("../models/database");
const Status = require("../utils/status");
const { Message, User, sequelize } = require("../models/database");
const jwt = require("jsonwebtoken");
// const db = Database.db

sequelize.sync().then(() => {
  console.log("Models synchronized with database in chatController");
});

async function getAllMessages(req, res) {
  try {
    const rows = await Message.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}
// const server = require('http').createServer();
// const io = require('socket.io')(server, {
//   cors: {
//     origin: '*',
//   },
// });

// io.on('connection', (socket) => {
//   console.log('a user connected');

//   socket.on('new message', (message) => {
//     console.log('new message', message);
//     io.emit('new message', message);
//   });

//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

// const port = process.env.PORT || 3000;
// server.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

async function saveMessage(req, res) {
  const { createdAt, text, user } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "zabi"); // Vérification et décodage du token
  const userId = decodedToken.userId;
  console.log(userId);
  Message.create({ text: text, UserId: userId })
    .then(() => {
      // Envoi d'une réponse au client
      res.send("Message ajouté avec succès !");
    })
    .catch((err) => {
      // Envoi d'une réponse avec une erreur au client
      res.status(500).send(`Erreur lors de l'ajout du message : ${err}`);
    });
}
// async function saveMessage(req, res) {
//   const { text } = req.body;

//   try {
//     const token = req.headers.authorization;
//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: "Token d'authentification manquant" });
//     }

//     // Vérification et décodage du token JWT
//     const decoded = jwt.verify(token, "zabi");
//     const userId = decoded.userId;

//     // Enregistrement du message avec l'ID de l'utilisateur connecté
//     const message = await Message.create({
//       text: text,
//       userId: userId,
//     });

//     res.json({ message: "Message enregistré avec succès", data: message });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Erreur de base de données" });
//   }
// }

module.exports = {
  getAllMessages,
  saveMessage,
};
