const axios = require("axios");
const dotenv = require("dotenv");
const pool = require("../utils/pool");
dotenv.config();

exports.question = async (req, res, next) => {
  const { category } = req.query;
  try {
    // res.setHeader("Set-Cookie",'hey=hell');
    pool.query("SELECT * FROM question WHERE category=$1",[category], (err, result) => {
      if (err) {
        throw new Error(err);
      }
      res.status(200).json(result.rows);
    });
  } catch (err) {
    throw err;
  }
};
