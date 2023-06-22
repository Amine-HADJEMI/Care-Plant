const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const loginRoutes = require("./routes/loginRoutes");
const changePasswordRoutes = require("./routes/changePasswordRoutes");
const postsRoutes = require("./routes/postsRoutes")
const chatRoutes = require("./routes/chatRoutes")
const ContactUsRoutes = require("./routes/contactUsRoutes")

const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/", userRoutes);
app.use("/", loginRoutes);
app.use("/", changePasswordRoutes);
app.use("/", postsRoutes);
app.use("/", chatRoutes);
app.use("/", ContactUsRoutes);




const port = 3000;

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port} \nhttp://localhost:${port}/`);
});

