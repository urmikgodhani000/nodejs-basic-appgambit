const Bootcamp = require("../../models/Bootcamps");
const errorHandler = require("../../middleware/error");
const errorResponse = require("../../utils/errorResponse");

exports.craeteBootcamps = async (req, res, next) => {
  try {
    //add user to req.body
    req.body.user = req.user.id;

    //Check for published bootcamp
    const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id });

    if (publishedBootcamp && req.user.role !== "admin") {
      return next(
        new errorResponse(
          `The user with ID ${req.user.id} has already published a bootcamp`,
          400
        )
      );
    }

    const bootcamps = await Bootcamp.create(req.body);
    res.status(201).json({ success: true, data: bootcamps });
  } catch (error) {
    next(error);
  }
};

exports.getBootcamps = async (req, res, next) => {
  //console.log(req.params.id)
  //let qur = req.query.select.split(",").join(" ");
  try {
    const bootcamps = await Bootcamp.find().populate("course");

    if (!bootcamps) {
      return next(
        new errorHandler(`Bootcamp not found with is of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data: bootcamps });
  } catch (error) {
    next(error);
  }
};

exports.deleteBootcamps = async (req, res) => {
  try {
    const bootcamps = await Bootcamp.findById(req.params.id);

    if (!bootcamps) {
      return res.status(400).json({ success: false });
    }

    bootcamps.remove();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};

exports.updateBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.findById(req.params.id);

    if (!bootcamps) {
      return res.status(400).json({ success: false });
    }

    //Make sure user is bootcamp owner
    if (
      bootcamps.user.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return next(
        new errorResponse(
          `User ${req.params.id} is not authorized to update this bootcomp`,
          404
        )
      );
    }

    const bootcampUpdate = await Bootcamp.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ success: true, data: bootcampUpdate });
  } catch (error) {
    next(error);
  }
};

exports.pagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIdx = (page - 1) * limit;
    const total = await Bootcamp.find().count();
    const data = await Bootcamp.find().skip(startIdx).limit(limit);

    const endIdx = page * limit;
    console.log(endIdx);

    const pagination = {};
    if (endIdx < total) {
      pagination.next = { page: page + 1, limit };
    }
    if (startIdx > 0) {
      pagination.prev = { page: page - 1, limit };
    }
    res
      .status(200)
      .json({ success: true, pagination, data: data, count: data.length });
  } catch (error) {
    next(error);
  }
};
