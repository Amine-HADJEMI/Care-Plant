const express = require("express");
const app = express();

const LoginController = require('../controllers/loginController')

app.post('/login', LoginController.loginUser);

module.exports = app;