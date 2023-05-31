const { Sequelize, DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const sequelize = new Sequelize("carePlant", "root", "123", {
  host: "localhost",
  dialect: "mysql",
});

const User = sequelize.define("user", {
  userName: {
    type: DataTypes.STRING,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roleId: {
    type: DataTypes.INTEGER,
    defaultValue: 2, // Valeur correspondant à "ROLE_USER"
    allowNull: false,
  },
});

const Role = sequelize.define("role", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

const Post = sequelize.define("post", {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: () => uuidv4(),
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
    type: DataTypes.BLOB,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  carePlant: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

const Message = sequelize.define("message", {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
});

const PasswordResetCode = sequelize.define(
  "password_reset_code",
  {
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "password_reset_codes",
  }
);
Role.hasMany(User, { foreignKey: "roleId" });
User.belongsTo(Role, { foreignKey: "roleId" });
User.belongsTo(Role, { foreignKey: "roleId" });
Role.hasMany(User, { foreignKey: "roleId" });
Post.belongsTo(User, { foreignKey: "UserId" });
User.hasMany(Post, { foreignKey: "UserId" });
Message.belongsTo(User, { foreignKey: "UserId" });
User.hasMany(Message, { foreignKey: "UserId" });
PasswordResetCode.belongsTo(User, { foreignKey: "UserId" });
User.hasMany(PasswordResetCode, { foreignKey: "UserId" });

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

// sequelize.sync({ force: true }).then(() => {
//   // Créer les rôles "Admin" et "User" si ils n'existent pas déjà
//   console.log("Models synchronized with database");
//   Role.findOrCreate({
//     where: { name: "Admin" },
//     defaults: { name: "Admin" },
//   }).then(() => {
//     Role.findOrCreate({
//       where: { name: "User" },
//       defaults: { name: "User" },
//     });
//   });
// });

module.exports = { User, Message, Post, Role, PasswordResetCode, sequelize };
