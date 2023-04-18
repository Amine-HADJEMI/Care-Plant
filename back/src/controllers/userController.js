const bcrypt = require("bcrypt");
const Database = require("../models/database");
const Status = require("../utils/status")
const  User  = require('../models/database'); 

// const db = Database.db

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
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);

    if (req.body.userName && req.body.email) {
      const existingUsers = await User.findAll({
        where: {
          [Op.or]: [
            { userName: req.body.userName },
            { email: req.body.email }
          ]
        }
      });
      

      if (existingUsers.length > 0) {
        res.status(200).send({ message: 'User already exists', status: Status.USER_ALREADY_EXISTS });
      }
      else {
        const user = await User.create({
          userName: req.body.userName,
          name: req.body.name,
          email: req.body.email.toLowerCase(),
          password: hash
        });
        
        res.status(201).send({ message:'User created successfully', status: Status.CREATE_USER});
      }
    } else {
      res.status(200).send({ message:'Please complete the data', status: Status.INCOMPELETE_DATA });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating user');
  }
}

async function updateUser(req, res) {
  const { name, email, password } = req.body;
  const { userName } = req.params;
  try {
    await User.update(
      { name, email, password },
      { where: { userName } }
    );
    res.json({ message: "User updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating user" });
  }
  
};

async function deleteUser(req, res) {  
  try {
    const existingUser = await User.findOne({ where: { userName: req.params.userName }});

    if (existingUser.length === 0) {
      return res.status(404).send(`The user with userName ${req.params.userName} does not exist`);
    }

    await User.destroy({
      where: {
        userName: req.params.userName
      }
    });
      res.status(200).send(`User with userName ${req.params.userName} deleted`);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
