// const express = require("express");
// const app = express();

// const PhotoController = require('../controllers/photoController')

// // app.get('/photos',PhotoController.getAllUsers)

// app.post('/photo', PhotoController.savePhoto)

const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // change the destination folder to your needs

app.post('/photo', upload.single('photo'), (req, res) => {
  // handle the photo here and save it to your database
  const photo = req.file;
  console.log('Received photo:', photo.originalname, photo.size);
  res.send('Photo received');
});