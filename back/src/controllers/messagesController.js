const bcrypt = require("bcrypt");
const { body, validationResult } = require('express-validator');
const Database = require("../models/database");
const Status = require("../utils/status")
const  { Message, sequelize }  = require('../models/database'); 

// const db = Database.db

sequelize.sync().then(() => {
  console.log('Models synchronized with database in messagesController');
});


async function getAllMessages(req, res){
  try {
    const db = await sqlite.open('database.sqlite');
    const messages = await Message.findAll({
      order: [['createdAt', 'DESC']]
    });   
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