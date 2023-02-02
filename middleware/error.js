const errorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  //console.log(err);

  //Mongoose bad ObjectId
  if (err.name === "CastError") {
    const msg = `Bootcamp notttt found with is of ${err.value}`;
    error = new errorResponse(msg, 404);
  }

  //Mongoose duplicate key
  if (err.code === 11000) {
    const msg = `Duplicate field value entered`;
    error = new errorResponse(msg, 400);
  }

  //Mongoose required error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new errorResponse(message, 400);
  }

  //Multer File Error
  if (err.code === "LIMIT_FILE_SIZE") {
    const msg = `File shoud be less then 5MB`;
    error = new errorResponse(msg, 400);
  }

  if (err.code === "LIMIT_UNEXPECTED_FILE") {
    const msg = `File items should be less then euqal to 5`;
    error = new errorResponse(msg, 400);
  }

  if (err.code === "ENOENT") {
    const msg = error.message;
    error = new errorResponse(msg, 400);
  }

  res
    .status(error.statusCode)
    .json({ success: false, error: error.message || "Server Error" });
};

module.exports = errorHandler;
