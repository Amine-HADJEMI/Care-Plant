const express = require("express");
const app = express();

const MessagesController = require('../controllers/messagesController')

app.get('/messages', MessagesController.getAllMessages );

module.exports = app;
