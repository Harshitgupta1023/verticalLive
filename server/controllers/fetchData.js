const axios = require("axios");
const dotenv = require("dotenv");
const pool = require("../utils/pool");
dotenv.config();

exports.question = async (req, res, next) => {
  const { category } = req.query;
  try {
    pool.query(
      "SELECT * FROM question WHERE category=$1",
      [category],
      (err, result) => {
        if (err) {
          res.status(400);
          throw new Error(err);
        }
        res.status(200).json(result.rows);
      }
    );
  } catch (err) {
    res.status(400);
    throw new Error(err);
}
};
