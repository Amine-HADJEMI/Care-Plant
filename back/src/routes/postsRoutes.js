const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const PhotoController = require('../controllers/photoController')

app.get('/posts', PhotoController.getPosts)

app.post('/save-photo', PhotoController.savePhoto);

app.put('/care-plant-post', PhotoController.carePlant);

 
module.exports = app;
