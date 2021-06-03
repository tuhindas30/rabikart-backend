const errorHandler = (err, req, res, next) => {
  if (!err.statusCode) {
    err.statusCode = err.name === "UnauthorizedError" ? 401 : 400;
  }
  console.log(err);
  res.status(err.statusCode).json({ status: "ERROR", message: err.message });
};

module.exports = errorHandler;
