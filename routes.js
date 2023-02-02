const express = require("express");
const router = express.Router();
const bootcamps = require("./controllers/bootcamps/index");
const course = require("./controllers/course/index");
const user = require("./controllers/user/index");
//console.log("routes");
router.use("/bootcamps", bootcamps);
router.use("/course", course);
router.use("/user", user);

module.exports = router;
