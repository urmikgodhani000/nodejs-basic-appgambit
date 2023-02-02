const User = require("../../models/User");

exports.register = async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await User.create(req.body);
    res.status(200).json({ sucess: true, data: user });
  } catch (error) {
    //console.log("create user");
    console.log(error);
    next(error);
  }
};
