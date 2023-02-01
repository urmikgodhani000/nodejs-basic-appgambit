const Course = require("../../models/Course");

exports.createCourse = async (req, res, next) => {
  console.log(req.body);
  try {
    const course = await Course.create(req.body);
    res.status(201).json({ success: true, data: course });
  } catch (error) {
    next(error);
  }
};

exports.getCourse = async (req, res, next) => {
  try {
    const course = await Course.find().populate({
      path: "bootcamp",
      select: "name description",
    });
    res.status(201).json({ success: true, data: course });
  } catch (error) {
    next(error);
  }
};
