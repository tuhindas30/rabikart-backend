const express = require("express");
const router = express.Router();

const { verifyAuth } = require("../middlewares/verifyAuth");
const AuthController = require("../controllers/auth.controller");
const Validator = require("../middlewares/validator");

/**
 * @swagger
 * components:
 *  schema:
 *    Signin:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *          description: The email of the user
 *        password:
 *          type: string
 *          description: The password of the user.
 *      example:
 *        email: test2@gmail.com
 *        password: Test@12345
 *    User:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *          description: The status of the request.
 *        data:
 *          type: object
 *          properties:
 *            user:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                  description: The auto generated id of the user.
 *                username:
 *                  type: string
 *                  description: The username of the user.
 *                email:
 *                  type: string
 *                  description: The email of the user.
 *                createdAt:
 *                  type: string
 *                  description: The creation time of the user.
 *                updatedAt:
 *                  type: string
 *                  description: The updation time of the user.
 *            token:
 *              type: string
 *              description: The authorization token of the user.
 *        message:
 *          type: string
 *          description: A feedback message of the request.
 *      example:
 *        status: SUCCESS
 *        data:
 *          user:
 *            id: 60c927c8c2c285301420fcb2
 *            username: demo
 *            email: demo@demo.com
 *            createdAt: 2021-06-03T19:04:40.778Z,
 *            updatedAt: 2021-07-25T07:38:38.830Z
 *          token: abdbcha
 *        message: User signed in successfully
 *  responses:
 *    401BadReq:
 *      description: Bad Request.
 *    404NotFound:
 *      description: Not found.
 *    500ServerError:
 *      description: Server Error.
 */

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: The auth managing API
 */

router.post("/signup", Validator.signup, AuthController.signup);

/**
 * @swagger
 * /auth/signin:
 *    post:
 *      summary: Returns user details with a JWT token.
 *      tags: [Auth]
 *      requestBody:
 *        requires: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schema/Signin"
 *      responses:
 *        200:
 *          description: The description of currently signed in user.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schema/User"
 *        401:
 *          $ref: "#/components/responses/401BadReq"
 *        404:
 *          $ref: "#/components/responses/404NotFound"
 *        500:
 *          $ref: "#/components/responses/500ServerError"
 */

router.post("/signin", Validator.validateEmail, AuthController.signin);
router.post(
  "/change-password",
  verifyAuth,
  Validator.changePassword,
  AuthController.changePassword
);

module.exports = router;
