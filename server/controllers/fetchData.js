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
          res.status(400).json({ error: err.message });
          throw new Error(err);
        }
        res.status(200).json(result.rows);
      }
    );
  } catch (err) {
    res.status(400).json({ error: err.message });
    throw new Error(err);
  }
};

exports.roleData = async (req, res, next) => {
  const { category } = req.query;
  try {
    pool.query(
      "SELECT * FROM roles WHERE category=$1",
      [category],
      (err, result) => {
        if (err) {
          res.status(400).json({ error: err.message });
          throw new Error(err);
        }
        res.status(200).json(result.rows);
      }
    );
  } catch (err) {
    res.status(400).json({ error: err.message });
    throw new Error(err);
  }
};

exports.qualityData = async (req, res, next) => {
  const { qrid } = req.query;
  try {
    pool.query("SELECT * FROM quality WHERE qrid=$1", [qrid], (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        throw new Error(err);
      }
      res.status(200).json(result.rows);
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
    throw new Error(err);
  }
};
