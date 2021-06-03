const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");
const { userResponse, HttpError } = require("../utils/helper");
const { doesUserExist } = require("./helpers");

const signup = async (req, res, next) => {
  try {
    const userData = req.body;
    let user = new User(userData);
    await user.setHashedPassword();
    user = await user.save();
    req.userId = user._id;
    res.json({
      status: "SUCCESS",
      data: userResponse(user),
      message: "User saved successfully",
    });
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      throw new HttpError(401, "Email does not exist");
    }
    if (!(await user.checkPassword(password))) {
      throw new HttpError(401, "Email or password not matched");
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
      issuer: "RabiKart",
    });
    req.userId = user._id;
    return res.json({
      status: "SUCCESS",
      data: { user: userResponse(user), token },
      message: "User signed in successfully",
    });
  } catch (err) {
    next(err);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { userId } = req;
    const { oldPassword, newPassword } = req.body;
    const user = await doesUserExist(userId);
    if (!(await user.checkPassword(oldPassword))) {
      throw new HttpError(401, "Your password not matched");
    }
    user.password = newPassword;
    await user.setHashedPassword();
    await user.save();
    return res.json({
      status: "SUCCESS",
      data: userResponse(user),
      message: "Password changed successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, signin, changePassword };
