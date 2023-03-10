const User = require("../../models/User");
const errorResponse = require("../../utils/errorResponse");
const crypto = require("crypto");

exports.register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const token = user.getSignedJwtToken();
    res.status(200).json({ sucess: true, data: user, token: token });
  } catch (error) {
    //console.log("create user");
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  console.log(email, password);
  if (!email || !password) {
    return next(new errorResponse("Please provide emial and password", 400));
  }

  const user = await User.findOne(
    { email },
    { name: 1, email: 1, password: 1 }
  );

  const removeFileUser = {
    name: user.name,
    email: user.email,
  };

  if (!user) {
    return next(new errorResponse("Invalid credential", 401));
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new errorResponse("Invalid credential", 401));
  }

  const token = user.getSignedJwtToken();
  res.status(200).json({ sucess: true, data: removeFileUser, token: token });
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user });
    res.status(200).json({ sucess: true, data: user });
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne(req.body);
    if (!user) {
      return next(new errorResponse("There is no user with that email", 404));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save();

    res.status(200).json({ sucess: true, data: user });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.resettoken)
      .digest("hex");

    const user = await User.findOne(
      {
        resetPasswordToken: resetPasswordToken,
      },
      { password: 0 }
    );
    if (!user) {
      return next(new errorResponse("Invalid token", 400));
    }

    //set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    const token = user.getSignedJwtToken();

    res.status(200).json({ sucess: true, data: user, token: token });
  } catch (error) {
    next(error);
  }
};
