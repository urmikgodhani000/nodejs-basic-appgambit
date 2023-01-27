exports.getBootcamps = (req, res, next) => {
  res.status(400).json({ success: true, mas: "getRequest", hello: req.hello });
};

exports.postBootcamps = (req, res, next) => {
  res.status(400).send("Hello from express/router/post");
};
