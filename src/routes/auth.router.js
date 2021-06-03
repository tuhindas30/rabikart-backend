const express = require("express");
const router = express.Router();

const { verifyAuth } = require("../middlewares/verifyAuth");
const AuthController = require("../controllers/auth.controller");

router.post("/signup", AuthController.signup);
router.post("/signin", AuthController.signin);
router.post("/change-password", verifyAuth, AuthController.changePassword);

module.exports = router;
