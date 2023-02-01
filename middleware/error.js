const errorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  //console.log(error);

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
  if (err._message === "Bootcamp validation failed") {
    const msg = error.message;
    error = new errorResponse(msg, 400);
  }

  res
    .status(error.statusCode)
    .json({ success: false, error: error.message || "Server Error" });
};

module.exports = errorHandler;
