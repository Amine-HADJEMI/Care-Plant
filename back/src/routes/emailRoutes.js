const express = require("express");
const app = express();

const EmailController = require('../controllers/emailController')

app.post('/send-confirmation-email', EmailController.sendConfirmationEmail)

module.exports = app;
