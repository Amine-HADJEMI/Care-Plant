const Database = require("../models/database");
const sqlite3 = require("sqlite3");

const savePhoto = (req, res) => {
  // const plantId = req.body.plantId;
  try{
    const photo = req.body;
    console.log(photo)
  } catch(e){
    console.log(e)
  }

  // Insert new photo into the photos table
    // const sqlite3 = `INSERT INTO photos(plant_id, photo_path) VALUES(?,?)`;
    // Database.db.run(sqlite3, [plantId, photo], function(err) {
    //   if (err) {
    //     console.error(err.message);
    //     return res.status(500).send({ error: 'Unable to save photo' });
    //   }
    //   console.log(`Photo has been saved with id ${this.lastID}`);

    //   return res.status(200).send({ success: 'Photo saved successfully' });
    // });
};

module.exports = { savePhoto };

