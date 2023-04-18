// const bcrypt = require("bcrypt");
const Database = require("../models/database");
const Status = require("../utils/status")
const Message = require('../models/database');

// const db = Database.db

async function getAllMessages(req, res) {
  try {
    const rows = await Message.findAll({
      order: [['createdAt', 'DESC']]
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
  const {  createdAt, text, user } = req.body;

  Message.create({ createdAt, text, user })
  .then(() => {
    // Envoi d'une réponse au client
    res.send('Message ajouté avec succès !');
  })
  .catch((err) => {
    // Envoi d'une réponse avec une erreur au client
    res.status(500).send(`Erreur lors de l'ajout du message : ${err}`);
  });
}

module.exports = {
  getAllMessages,
  saveMessage
};