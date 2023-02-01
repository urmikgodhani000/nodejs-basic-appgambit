const express = require("express");
const {
  craeteBootcamps,
  getBootcamps,
  deleteBootcamps,
  updateBootcamps,
  pagination,
} = require("./controllers");
const router = express.Router();

router.route("/").post(craeteBootcamps);
router
  .route("/:id")
  .delete(deleteBootcamps)
  .get(getBootcamps)
  .patch(updateBootcamps);
router.post("/get/getPage", pagination);

module.exports = router;
