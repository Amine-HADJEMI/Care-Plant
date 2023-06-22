const {Post, sequelize} = require('../models/database');

sequelize.sync().then(() => {
  console.log('Models synchronized with database in postsController');
});

const getPosts = async (req, res) => {
  const posts = await Post.findAll();
  const data = posts.map((post) => ({
    id: post.id,
    title: post.title,
    description: post.description,
    image: post.image,
    userName: post.userName,
    carePlant: (post.carePlant === 0 ? false : true),
  }));
  res.send(data);  
}

const savePhoto = (req, res) => {
  const { title, description, image, userName, createdAt, carePlant } = req.body;

  const carePlantBool = carePlant ? 1 : 0; // 1 si vrai, 0 si faux

  Post.create({
    title: title,
    description: description,
    image: image,
    userName: userName,
    createdAt: createdAt,
    carePlant: carePlantBool
  })
  .then((post) => {
    console.log(`Publication enregistrée avec l'ID ${post.id}`);
    res.send({ id: post.id });
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send(`Erreur lors de l'enregistrement de la publication : ${err}`);
  });
  
};

const carePlant = async (req, res) => {
  const postId  = req.body.id;
  try {
    const post = await Post.findByPk(postId);
  
    if (!post) {
      return res.status(404).send({ message: 'Publication non trouvée' });
    }
  
    await post.update({ carePlant: true });
  
    res.send({ message: 'Publication mise à jour avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de la mise à jour de la publication');
  }
};

module.exports = { 
  savePhoto,
  getPosts,
  carePlant
};

