const errorHandler = (err, req, res, next) => {
  if (err) {
    // console.log(err);
    if (err.message) {
      res.status(400).json({
        status: "Failed",
        error: err.message,
      });
    } else {
      res.status(400).json({
        status: "Failed",
        error: err,
      });
      return;
    }
  } else {
    next();
  }
};

module.exports = errorHandler;
