const jwt = require("jsonwebtoken");
const { HttpError } = require("../utils/helper");
const secret = process.env.JWT_SECRET;

const verifyAuth = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new HttpError(403, "No credentials received");
    }
    if (req.headers.authorization.split(" ")[0] !== "Bearer") {
      throw new HttpError(403, "Invalid credential format");
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new HttpError(401, "Unauthorized access");
    }
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.userId;
    return next();
  } catch (err) {
    next(err);
  }
};

module.exports = { verifyAuth };
