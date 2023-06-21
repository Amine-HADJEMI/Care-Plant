const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const UserController = require("../controllers/userController");

app.get("/", (req, res) => {
  res.send("Welcome to BACK -- CarePlant...");
});

app.get("/users", UserController.getAllUsers);

app.post("/create-user", UserController.createUser);

app.put('/updateUser', UserController.updateUser)

app.delete('/deleteUser', UserController.deleteUser)

module.exports = app;
