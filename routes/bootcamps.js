const express = require("express");
const { getBootcamps, postBootcamps } = require("../controllers/bootcamps");
const router = express.Router();

router.get("/", getBootcamps);

router.post("/", postBootcamps);

module.exports = router;
