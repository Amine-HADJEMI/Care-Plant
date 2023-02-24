const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/", userRoutes);

const port = 3000;

app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port} \nhttp://localhost:${port}/`);
});