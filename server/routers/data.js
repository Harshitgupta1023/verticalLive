const express = require("express");

const fetchData = require("../controllers/fetchData");
const createData = require("../controllers/createData")
const router = express.Router();

router.get("/fetch", fetchData.question);
router.post("/createQuestion", createData.create);
router.post("/answer", createData.answer);

module.exports = router;
