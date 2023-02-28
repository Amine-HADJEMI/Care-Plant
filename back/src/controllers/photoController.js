const Database = require("../models/database");
const sqlite3 = require("sqlite3");

const db = Database.db

async function savePhoto(req, res) {
    const { uri } = req.body;

    db.run(
        "INSERT INTO photos (url) VALUES (?)",
        [uri],
        function (err) {
            if (err) {
                console.error(err.message);
                res.status(500).send("Unable to save photo");
            } else {
                res.status(200).send({ url: uri });
            }
        }
    );
}

module.exports = {
    savePhoto
}
