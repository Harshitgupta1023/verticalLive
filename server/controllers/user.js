const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const makeID = require("../utils/generateID").makeID;

const dotenv = require("dotenv");
dotenv.config();

const pool = require("../utils/pool");

exports.create = asyncHandler(async (req, res, next) => {
  const uid = makeID(8);
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  let userExist = false;
  try {
    const result = await pool.query(
      `SELECT email FROM userData WHERE email=$1`,
      [email]
    );
    if (result.rowCount !== 0) {
      userExist = true;
      res.status(400);
      throw new Error("User already exists!!");
    }
  } catch (err) {
    res.status(400);
    throw new Error(err);
  }

  if (!userExist) {
    //   Password Hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    pool.query(
      "INSERT INTO userData (UID,email,password) VALUES ($1,$2,$3)",
      [uid, email, hashedPassword],
      (err, result) => {
        if (err) {
          res.status(400);
          throw new Error(err);
        }
        res.status(200).json({
          uid: uid,
          email: email,
          isAdmin:uid === process.env.ADMIN_ID,

        });
      }
    );
  }
});

exports.login = asyncHandler(async (req, res, next) => {
  const uid = makeID(8);

  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  pool.query(
    "SELECT * FROM userData WHERE email=$1",
    [email],
    async (err, result) => {
      if (err) {
        res.status(400);

        throw new Error(err);
      }
      if (result.rowCount === 0) {
        res.status(400);
        throw new Error("No user exists!!");
      }
      const compareResult = await bcrypt.compare(
        password,
        result.rows[0].password
      );
      if (compareResult) {
        res.status(200).json({
          uid: result.rows[0].uid,
          isAdmin:result.rows[0].uid === process.env.ADMIN_ID,
          email: result.rows[0].email,
        });
      } else {
        res.status(400);
        throw new Error("Password Incorrect!!");
      }
    }
  );
});
