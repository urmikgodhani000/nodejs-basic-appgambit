const express = require("express");
const {
  craeteBootcamps,
  getBootcamps,
  deleteBootcamps,
  updateBootcamps,
  pagination,
} = require("./controllers");
const router = express.Router();

router.post("/", craeteBootcamps);
router.get("/:id", getBootcamps);
router.delete("/:id", deleteBootcamps);
router.patch("/:id", updateBootcamps);
router.post("/get/getPage", pagination);

module.exports = router;
