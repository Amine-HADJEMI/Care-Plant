const Database = require("../models/database");
const sqlite3 = require("sqlite3");

const Status = require("../utils/status")

const db = Database.db

const getPosts = (req, res) => {
  db.all('SELECT * FROM posts', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur lors de la récupération des publications');
    } else {
      const data = rows.map((post) => ({
        id: post.id,
        title: post.title,
        description: post.description,
        image: post.image,
        userName: post.userName,
        createdAt: new Date(post.createdAt),
      }));
      res.send(data);
    }
  });
}

const savePhoto = (req, res) => {
  const { title, description, image, userName, createdAt } = req.body;

  // insérer la nouvelle publication dans votre base de données
  db.run(
    `INSERT INTO posts (title, description, image, userName, createdAt)
    VALUES (?, ?, ?, ?, ?)`,
    [title, description, image, userName, createdAt],
    function(err) {
      if (err) {
        console.error(err);
        res.status(500).send('Erreur lors de l\'enregistrement de la publication');
      } else {
        console.log(`Publication enregistrée avec l'ID ${this.lastID}`);
        res.send({ id: this.lastID });
      }
    }
  );
};

module.exports = { 
  savePhoto,
  getPosts 
};

