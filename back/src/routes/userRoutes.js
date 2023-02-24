const express = require("express");
const app = express();

const UserController = require('../controllers/userController')

app.get("/", (req, res) => {
  res.send("Welcome to BACK -- CarePlant...");
});

app.get('/users',UserController.getAllUsers)

app.post('/users', UserController.createUser)

app.delete('/users/:userName', UserController.deleteUser)

app.put('/users/:userName', UserController.updateUser)

module.exports = app;
