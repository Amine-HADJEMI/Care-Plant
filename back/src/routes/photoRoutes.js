const express = require("express");
const app = express();

const PhotoController = require('../controllers/photoController')

app.get('/photos',PhotoController.getAllUsers)

app.post('/photo', PhotoController.createUser)