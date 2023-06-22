const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const ContactUsController = require("../controllers/contactUsController");

app.post("/contact-us", ContactUsController.sendEmail);

module.exports = app;
