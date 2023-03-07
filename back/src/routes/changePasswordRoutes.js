const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
const ChangePasswordController = require('../controllers/changePasswordController')

app.post('/change-password', ChangePasswordController.changePassword)

app.post('/send-confirmation-email', ChangePasswordController.sendConfirmationEmail)

module.exports = app;
