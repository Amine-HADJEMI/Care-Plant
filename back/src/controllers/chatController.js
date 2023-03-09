const bcrypt = require("bcrypt");
const Database = require("../models/database");
const Status = require("../utils/status")

const db = Database.db

async function getAllMessages(req, res) {
  try {
    const rows = await new Promise((resolve, reject) => {y
      
      db.all('SELECT * FROM messages ORDER BY createdAt DESC', (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      });
    });
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

async function saveMessage(req, res) {
  const {  createdAt, text, user } = req.body;

  // Requête SQL pour insérer le message dans la table 'messages'
  const sql = `INSERT INTO messages (createdAt, text, user) VALUES (?, ?, ?)`;
  const params = [createdAt, text, user];

  // Exécution de la requête SQL
  db.run(sql, params, (err) => {
    if (err) {
      // Envoi d'une réponse avec une erreur au client
      res.status(500).send(`Erreur lors de l'ajout du message : ${err}`);
    } else {
      // Envoi d'une réponse au client
      res.send('Message ajouté avec succès !');
    }
  });
}

module.exports = {
  getAllMessages,
  saveMessage
};