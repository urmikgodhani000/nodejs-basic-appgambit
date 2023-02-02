const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please add a name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please add a emails"],
    validate: [validator.isEmail, "Please enter valid email"],
  },
  role: {
    type: String,
    enum: ["user", "publisher"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  const salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hashSync(this.password, salt);
});

module.exports = mongoose.model("User", userSchema);
