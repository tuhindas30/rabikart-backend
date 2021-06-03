const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const verifyAuth = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.userId;
    return next();
  } catch (err) {
    next(err);
  }
};

module.exports = { verifyAuth };
