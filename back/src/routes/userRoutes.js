const express = require("express");
const app = express();

const UserController = require('../controllers/userController')

app.get("/", (req, res) => {
  res.send("Welcome to BACK -- CarePlant...");
});

app.get('/users',UserController.getAllUsers)

app.post('/create-user', UserController.createUser)

app.put('/user/:userName', UserController.updateUser)

app.delete('/user/:userName', UserController.deleteUser)

module.exports = app;
