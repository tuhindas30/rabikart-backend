const {
  isLength,
  isEmail,
  isAlpha,
  isLowercase,
  isStrongPassword,
  isMongoId,
  isNumeric,
} = require("validator");
const { HttpError } = require("../utils/helper");

const signup = (req, _, next) => {
  const { username, email, password } = req.body;
  if (!isLength(username, { min: 3, max: 20 })) {
    throw new HttpError(400, "Username is too short or too long");
  }
  if (!isAlpha(username)) {
    throw new HttpError(400, "Username must have only alphabets");
  }
  if (!isLowercase(username)) {
    throw new HttpError(400, "Username must have only lowercase characters");
  }
  if (!isEmail(email)) {
    throw new HttpError(400, "Invalid email format");
  }
  if (!isStrongPassword(password)) {
    throw new HttpError(400, "Not a strong password");
  }
  next();
};

const validateEmail = (req, _, next) => {
  const { email } = req.body;
  if (!isEmail(email)) {
    throw new HttpError(400, "Invalid email format");
  }
  next();
};

const changePassword = (req, _, next) => {
  const { newPassword } = req.body;
  if (!isStrongPassword(newPassword)) {
    throw new HttpError(400, "Not a strong password");
  }
  next();
};

const validateCartItem = (req, _, next) => {
  const { productId } = req.body;
  if (!isMongoId(productId)) {
    throw new HttpError(400, "Not a valid product ID");
  }
  next();
};

const validateCartSyncedItem = (req, _, next) => {
  const cartItems = req.body;
  for (let i = 0; i < cartItems.length; i++) {
    let { product } = cartItems[i];
    if (!isMongoId(product._id)) {
      throw new HttpError(400, "Not a valid product ID");
    }
  }
  next();
};

const validateProductId = (req, _, next) => {
  const { productId } = req.body;
  if (!isMongoId(productId)) {
    throw new HttpError(400, "Not a valid product ID");
  }
  next();
};

module.exports = {
  signup,
  validateEmail,
  changePassword,
  validateCartItem,
  validateCartSyncedItem,
  validateProductId,
};
