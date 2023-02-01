const errorHandler = require("../../middleware/error");
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
    const course = await Course.findById(req.params.id).populate({
      path: "bootcamp",
      select: "name description",
    });

    if (!course) {
      return next(
        new errorHandler(`No course with the id of ${req.params.id}`),
        404
      );
    }

    res.status(200).json({ success: true, data: course });
  } catch (error) {
    next(error);
  }
};

exports.getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().populate({
      path: "bootcamp",
      select: "name description",
    });

    if (!course) {
      return next(new errorHandler(`No course found}`), 404);
    }

    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    next(error);
  }
};

exports.uploadPhoto = async (req, res) => {
  try {
    res.json({
      success: true,
      message: `You uploaded ${req.files.length} files`,
    });
  } catch (error) {
    next(error);
  }
};
