const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const UserController = require("../controllers/userController");

app.get("/", (req, res) => {
  res.send("Welcome to BACK -- CarePlant...");
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Récupère tous les utilisateurs.
 *     responses:
 *       200:
 *         description: Succès. La liste des utilisateurs est renvoyée.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Erreur du serveur. Une erreur s'est produite lors de la récupération des utilisateurs.
 */
app.get("/users", UserController.getAllUsers);

app.post("/create-user", UserController.createUser);

app.put('/updateUser', UserController.updateUser)

app.delete('/deleteUser', UserController.deleteUser)

module.exports = app;
