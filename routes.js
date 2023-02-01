const express = require("express");
const router = express.Router();
const bootcamps = require("./controllers/bootcamps/index");
const course = require("./controllers/course");
//console.log("routes");
router.use("/bootcamps", bootcamps);
router.use("/course", course);

module.exports = router;
