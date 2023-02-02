const express = require("express");
const { register, login, getUser } = require("./controller");
const router = express.Router();
const { protect } = require("../../middleware/auth");

router.get("/getUser", protect, getUser);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
