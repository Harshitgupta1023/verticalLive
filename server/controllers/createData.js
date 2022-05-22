const axios = require("axios");
const makeID = require("../utils/generateID").makeID;
const pool = require("../utils/pool");
const dotenv = require("dotenv");
dotenv.config();

exports.create = async (req, res, next) => {
  const qid = makeID(8);
  const { category, answer, description, questionType, uid } = req.body;
  if (uid !== process.env.ADMIN_ID) {
    res.status(400);
    throw new Error("Access Unauthorized!!!");
  }
  try {
    pool.query(
      "INSERT INTO question (QID,description,questionType,category,answer) VALUES ($1,$2,$3,$4,$5)",
      [qid, description, questionType, category, answer],
      (err, result) => {
        if (err) {
          res.status(400);
          throw new Error(err);
        }
      }
    );
    res.status(200).send("Done");
  } catch (err) {
    res.status(400);
    throw new Error(err);
  }
};

exports.answer = async (req, res, next) => {
  try {
    const { uid, result } = req.body;
    res.send("hello answer");
    let query = [];
    Object.keys(result).map((dat) => {
      query.push(`('${uid}','${dat}','${result[dat]}')`);
    });
    pool.query(
      "INSERT INTO answerData (UID,QID,answer) VALUES " + query.join(",") + ";",
      (err, result) => {
        if (err) {
          res.status(400);
          throw new Error(err);
        }
        res.status(200);
      }
    );
  } catch (err) {
    res.status(400);
    throw new Error(err);
  }
};
