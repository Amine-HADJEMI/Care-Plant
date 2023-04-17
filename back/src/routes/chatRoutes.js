const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const MessagesController = require('../controllers/chatController')

app.get('/messages', MessagesController.getAllMessages );

app.post('/add-message', MessagesController.saveMessage );

module.exports = app;
