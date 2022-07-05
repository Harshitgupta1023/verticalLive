const axios = require("axios");
const pool = require("../utils/pool");
const { PythonShell } = require("python-shell");
const dotenv = require("dotenv");
dotenv.config();

exports.answer = async (req, res, next) => {
  try {
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

    const { uid, category,result } = req.body;
    let query = [];
    let value = [category];
    Object.keys(result).map((dat) => {
      query.push(`('${uid}','${dat}','${result[dat]}','${datetime}')`);
      value.push(`${result[dat].split("$$")}`);
    });

    pool.query(
      "INSERT INTO answerData (UID,QID,answer,createdAt) VALUES " +
        query.join(",") +
        ";",
      (err, result) => {
        if (err) {
          res.status(400).json({ error: err.message });
          throw new Error(err);
        }
      }
    );

    PythonShell.run(
      "python_code/intern.py",
      { args: value },
      (err, results) => {
        if (err) {
          res.status(400).json({ error: err });
          throw new Error(err);
        }
        res.status(200).send(results);
      }
    );
  } catch (err) {
    res.status(400).json({ error: err.message });
    throw new Error(err);
  }
};
