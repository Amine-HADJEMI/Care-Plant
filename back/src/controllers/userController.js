const bcrypt = require("bcrypt");
const Database = require("../models/database");
const Status = require("../utils/status");
const { User, Role, sequelize } = require("../models/database");
const { Op } = require("sequelize");
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
    const password = req.body.password;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,20}$/;

    if (!passwordRegex.test(password)) {
      res.status(400).send({
        message: "Invalid password",
        status: Status.INVALID_PASSWORD_FORMAT,
      });
    } else {
      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);

      if (req.body.userName && req.body.email) {
        const existingUsers = await User.findAll({
          where: {
            [Op.or]: [
              { userName: req.body.userName },
              { email: req.body.email },
            ],
          },
        });

        if (existingUsers.length > 0) {
          res.status(200).send({
            message: "User already exists",
            status: Status.USER_ALREADY_EXISTS,
          });
        } else {
          const user = await User.create({
            userName: req.body.userName,
            name: req.body.name,
            email: req.body.email.toLowerCase(),
            password: hash,
          });
          // Add default role "User" to user
          const role = await Role.findOne({ where: { name: "User" } });
          await user.setRole(role);

          res.status(201).send({
            message: "User created successfully",
            status: Status.CREATE_USER,
          });
        }
      } else {
        res.status(200).send({
          message: "Please complete the data",
          status: Status.INCOMPELETE_DATA,
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
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
