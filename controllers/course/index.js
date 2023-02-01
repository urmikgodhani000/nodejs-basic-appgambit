const express = require("express");
const {
  createCourse,
  getCourse,
  getCourses,
  uploadPhoto,
} = require("./controller");
const router = express.Router();
const multer = require("multer");

//photo upload
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "controllers/course/photo");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix);
    },
  }),
  limits: { fileSize: 1024 * 1024 * 2 },
}).array("file_upload", 5);

router.route("/").get(getCourses).post(createCourse);
router.get("/:id", getCourse);
router.post("/photo", upload, uploadPhoto);

module.exports = router;
