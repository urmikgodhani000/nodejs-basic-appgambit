const express = require("express");
const { protect } = require("../../middleware/auth");
const {
  craeteBootcamps,
  getBootcamps,
  deleteBootcamps,
  updateBootcamps,
  pagination,
} = require("./controllers");
const router = express.Router();

router.route("/").post(protect, craeteBootcamps);
router
  .route("/:id")
  .delete(deleteBootcamps)
  .get(getBootcamps)
  .patch(protect, updateBootcamps);
router.post("/get/getPage", pagination);

module.exports = router;
