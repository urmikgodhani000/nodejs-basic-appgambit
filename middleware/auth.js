const errorResponse = require("../utils/errorResponse");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  //Make sure token exits
  if (!token) {
    return next(new errorResponse("Not authorize to access this route", 401));
  }

  try {
    //verify token
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decode.id);
    next();
  } catch (error) {
    return next(new errorResponse("Not authorize to access this route", 401));
  }
};

//Grant access to specific roles
exports.authorize =
  (...roles) =>
  (req, res, next) => {
    console.log(roles);
    if (!roles.includes(req.user.role)) {
      return next(
        new errorResponse(
          `${req.user.role} role is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
