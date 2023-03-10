const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const loginRoutes = require("./routes/loginRoutes");
const changePasswordRoutes = require("./routes/changePasswordRoutes");
const postsRoutes = require("./routes/postsRoutes")
const chatRoutes = require("./routes/chatRoutes")
// const server = require('http').createServer(app);

const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/", userRoutes);
app.use("/", loginRoutes);
app.use("/", changePasswordRoutes);
app.use("/", postsRoutes);
app.use("/", chatRoutes);


// const io = require('socket.io')(server);

// const connectedUsers = new Set();

// io.on('connection', (socket) => {
//   console.log('a user connected');

//   connectedUsers.add(socket.id); // Ajouter la socket à la liste des sockets connectées

//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//     connectedUsers.delete(socket.id); // Supprimer la socket de la liste des sockets connectées
//   });

//   socket.on('send-message', (message) => {
//     console.log('message: ' + message.text);
//     io.emit('new-message', message);
//   });
// });

const port = 3000;

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port} \nhttp://localhost:${port}/`);
});