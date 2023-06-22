const { Sequelize, DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const sequelize = new Sequelize("careplant", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
sequelize.sync();
// Définir les modèles de tables
const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Role = sequelize.define("Role", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

const Message = sequelize.define("Message", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const PasswordEmailResetCode = sequelize.define("PasswordEmailResetCode", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Relations entre les tables
User.belongsTo(Role); // Relation "User" avec "Role"
User.hasMany(Post); // Relation "User" avec "Post"
User.hasMany(Message); // Relation "User" avec "Message"
User.hasMany(PasswordEmailResetCode); // Relation "User" avec "PasswordEmailResetCode"

// Créer les tables dans la base de données
sequelize
  .sync()
  .then(async () => {
    console.log("Tables créées avec succès.");
    // Vérifier si les rôles existent déjà avant de les créer
    const roles = ["ROLE_USER", "ROLE_ADMIN"];
    for (const roleName of roles) {
      await Role.findOrCreate({
        where: { name: roleName },
        defaults: { name: roleName },
      });
    }

    console.log("Rôles créés avec succès.");
  })
  .catch((error) => {
    console.error("Erreur lors de la création des tables :", error);
  });
module.exports = {
  User,
  Message,
  Post,
  Role,
  PasswordEmailResetCode,
  sequelize,
};
