const bcrypt = require("bcrypt");
const Database = require("../models/database");
const Status = require("../utils/status");
const { User, Role, sequelize } = require("../models/database");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

// const db = Database.db

sequelize.sync().then(() => {
  console.log("Models synchronized with database in userController");
});

async function getAllUsers(req, res) {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

async function createUser(req, res) {
  try {
    const { lastName, firstName, email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(201).json({  status: Status.USER_ALREADY_EXISTS, error: "Cet utilisateur existe déjà" });
    }

    // Rechercher le rôle par défaut 'ROLE_USER' ou le créer s'il n'existe pas encore
    let role = await Role.findOne({
      where: { name: "ROLE_USER" },
    });

    if (!role) {
      role = await Role.create({
        name: "ROLE_USER",
      });
    }

    // Vérifier le format du mot de passe avec une expression régulière
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error:
          "Le mot de passe doit contenir au moins 8 caractères, une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial",
      });
    }

    // Créer l'utilisateur dans la base de données avec le rôle par défaut
    const user = await User.create({
      id: uuidv4(),
      lastName,
      firstName,
      email,
      password: await bcrypt.hash(password, 10),
      RoleId: 1,
    });

    res.status(201).send({
      message: "User created successfully",
      status: Status.CREATE_USER,
    });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la création de l'utilisateur" });
  }
}


async function updateUser(req, res) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,20}$/;

  const { name, email, password } = req.body;
  const { userName } = req.params;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ error: "Invalid password format" });
  }
  try {
    const user = await User.findOne({ where: { userName } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.name = name;
    user.email = email;
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    res.json({ message: "User updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating user" });
  }
}

async function deleteUser(req, res) {
  try {
    const existingUser = await User.findOne({ where: { userName: req.body.userName }});

    if (existingUser.length === 0) {
      return res.status(404).send(`The user with userName ${req.body.userName} does not exist`);
    }

    await User.destroy({
      where: {
        userName: req.body.userName
      }
    });
      res.status(200).send({message: `User with userName ${req.body.userName} deleted`, status: Status.DELETE_USER});
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
