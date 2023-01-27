const logger = (req, res, next) => {
  req.hello = "Hellow World";
  console.log("Middlware run");
  next();
};

module.exports = logger;
