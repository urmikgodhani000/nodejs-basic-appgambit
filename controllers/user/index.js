const express = require("express");
const {
  register,
  login,
  getUser,
  forgotPassword,
  resetPassword,
} = require("./controller");
const router = express.Router();
const { protect } = require("../../middleware/auth");

router.get("/getUser", protect, getUser);
router.post("/register", register);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword/:resettoken", resetPassword);

module.exports = router;
