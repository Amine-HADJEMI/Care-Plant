const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
const LoginController = require("../controllers/loginController");

app.post("/login", LoginController.loginUser);

module.exports = app;
