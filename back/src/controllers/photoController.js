const bcrypt = require("bcrypt");
const Database = require("../models/database");

const db = Database.db

async function savePhoto(name, data) {
  const stmt = db.prepare("INSERT INTO images (name, data) VALUES (?, ?)");
  stmt.run(name, data, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Image ${name} enregistrée avec succès dans la base de données`);
    }
  });
}



// const sqlite3 = require('sqlite3').verbose();

// Ouvrir la base de données
// const db = new sqlite3.Database('database.db');

// Créer la table pour stocker les images si elle n'existe pas encore


// Fonction pour enregistrer une image dans la base de données


// Exemple d'utilisation de la fonction saveImage pour enregistrer une image
// const fs = require('fs');
// const path = require('path');
// const imageName = 'image.jpg';
// const imagePath = path.join(__dirname, 'images', imageName);
// const imageBuffer = fs.readFileSync(imagePath);
// saveImage(imageName, imageBuffer);


module.exports = {
  savePhoto
}