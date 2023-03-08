const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const PhotoController = require('../controllers/photoController')

app.post('/savePhoto', PhotoController.savePhoto);
 
module.exports = app;
