const bcrypt = require("bcrypt");
const { body, validationResult } = require('express-validator');
const Database = require("../models/database");
const Status = require("../utils/status")

const db = Database.db


async function getAllMessages(req, res){
  try {
    const db = await sqlite.open('database.sqlite');
    const messages = await db.all('SELECT * FROM messages ORDER BY createdAt DESC');
    await sqlite.close(db);
    res.send(messages);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  getAllMessages,
};