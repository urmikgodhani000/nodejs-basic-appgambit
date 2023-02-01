const express = require("express");
const { createCourse, getCourse } = require("./controller");
const router = express.Router();

router.get("/", getCourse);
router.post("/", createCourse);

module.exports = router;
