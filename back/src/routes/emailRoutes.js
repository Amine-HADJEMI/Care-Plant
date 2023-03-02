const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
const EmailController = require("../controllers/emailController");

app.post("/send-confirmation-email", EmailController.sendConfirmationEmail);

module.exports = app;
