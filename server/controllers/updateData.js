const axios = require("axios");
const dotenv = require("dotenv");
const pool = require("../utils/pool");
dotenv.config();

exports.updateQuality = async (req, res, next) => {
  const { qrid, name, weight } = req.body;
  try {
    pool.query(
      "Update quality SET name=$1 , weight=$2 WHERE qrid=$3 ",
      [name,weight,qrid],
      (err, result) => {
        if (err) {
          res.status(400).json({ error: err.message });
          throw new Error(err);
        }
        res.status(200).json({message:"Done!!"});
      }
    );
  } catch (err) {
    res.status(400).json({ error: err.message });
    throw new Error(err);
  }
};
