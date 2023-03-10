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
        carePlant: (post.carePlant === 0 ? false : true),
      }));
      res.send(data);
    }
  });
}

const savePhoto = (req, res) => {
  const { title, description, image, userName, createdAt, carePlant } = req.body;

  const carePlantBool = carePlant ? 1 : 0; // 1 si vrai, 0 si faux

  db.run(
    `INSERT INTO posts (title, description, image, userName, createdAt, carePlant)
    VALUES (?, ?, ?, ?, ?, ?)`,

    [title, description, image, userName, createdAt, carePlantBool],
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

const carePlant = (req, res) => {
  const postId  = req.body.id;
  db.run(
    `UPDATE posts SET carePlant = 1 WHERE id = ?`,
    [postId],
    function(err) {
      if (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la mise à jour de la publication');
      } else {
        res.send({ message: 'Publication mise à jour avec succès' });
      }
    }
  );
};


module.exports = { 
  savePhoto,
  getPosts,
  carePlant
};

