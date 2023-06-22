const { Post, sequelize } = require("../models/database");

sequelize.sync().then(() => {
  console.log("Models synchronized with database in postsController");
});

const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    const data = posts.map((post) => ({
      id: post.id,
      title: post.title,
      description: post.description,
      image: post.image,
    }));
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving posts");
  }
};

const savePhoto = async (req, res) => {
  const { title, description, image } = req.body;

  try {
    const post = await Post.create({
      title: title,
      description: description,
      image: image,
    });

    console.log(`Post saved with ID: ${post.id}`);
    res.send({ id: post.id });
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error saving post: ${err}`);
  }
};

const carePlant = async (req, res) => {
  const postId = req.body.id;

  try {
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    await post.update({ carePlant: true });

    res.send({ message: "Post updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating post");
  }
};

module.exports = {
  savePhoto,
  getPosts,
  carePlant,
};
