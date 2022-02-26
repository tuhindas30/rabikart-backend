const { HttpError } = require("../utils/helper");

const undefinedRoutesHandler = (req, res, next) => {
  const err = new HttpError(404, "The route doesn't exist");
  next(err);
};

module.exports = undefinedRoutesHandler;
