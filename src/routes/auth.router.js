const express = require("express");
const router = express.Router();

const { verifyAuth } = require("../middlewares/verifyAuth");
const AuthController = require("../controllers/auth.controller");
const Validator = require("../middlewares/validator");

router.post("/signup", Validator.signup, AuthController.signup);
router.post("/signin", Validator.validateEmail, AuthController.signin);
router.post(
  "/change-password",
  verifyAuth,
  Validator.changePassword,
  AuthController.changePassword
);

module.exports = router;
