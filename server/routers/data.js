const express = require("express");

const fetchData = require("../controllers/fetchData");
const createData = require("../controllers/createData");
const answerData = require("../controllers/answerData");
const updateDate = require("../controllers/updateData")
const router = express.Router();

router.get("/fetch", fetchData.question);
router.get("/fetchRole", fetchData.roleData);
router.get("/fetchQuality", fetchData.qualityData);
router.put("/updateQuality",updateDate.updateQuality)
router.post("/createQuestion", createData.create);
router.post("/answer", answerData.answer);

module.exports = router;
