const axios = require("axios");
const makeID = require("../utils/generateID").makeID;
const pool = require("../utils/pool");
const dotenv = require("dotenv");
dotenv.config();

exports.create = async (req, res, next) => {
  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  const qid = makeID(8);
  const { category, answer, description, questionType, uid } = req.body;
  if (uid !== process.env.ADMIN_ID) {
    res.status(400).json({ error: "Access Unauthorized!!!" });
    throw new Error("Access Unauthorized!!!");
  }
  try {
    pool.query(
      "INSERT INTO question (QID,description,questionType,category,answer,createdAt) VALUES ($1,$2,$3,$4,$5,$6)",
      [qid, description, questionType, category, answer, datetime],
      (err, result) => {
        if (err) {
          res.status(400).json({ error: err.message });
          throw new Error(err);
        }
      }
    );
    res.status(200).send("Done");
  } catch (err) {
    res.status(400).json({ error: err.message });
    throw new Error(err);
  }
};
