const express = require("express");
const app = express();

const PhotoController = require('../controllers/photoController')

app.post('/savePhoto',PhotoController.savePhoto);

module.exports = app;
