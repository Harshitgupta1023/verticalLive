const express = require("express");

const userData = require("../controllers/user");

const router = express.Router();

router.post("/createUser", userData.create);
router.post("/loginUser", userData.login);
module.exports = router;
