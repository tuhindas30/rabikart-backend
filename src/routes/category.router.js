const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/category.controller");
const { verifyAuth } = require("../middlewares/verifyAuth");

/**
 * @swagger
 * components:
 *  schema:
 *    Category:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *          description: The auto generated id of the category.
 *        title:
 *          type: string
 *          description: The title of the category.
 *        createdAt:
 *          type: string
 *          description: The creation time of the category.
 *        updatedAt:
 *          type: string
 *          description: The updation time of the category.
 *        __v:
 *          type: number
 *          description: The version of the category.
 *    Response:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *          description: The status of the request.
 *        data:
 *          type: array
 *          $ref: "#/components/schema/Category"
 *        message:
 *          type: string
 *          description: A feedback message of the request.
 *      example:
 *        status: SUCCESS
 *        data: [
 *          {
 *          _id: 6458c5821a88421c665f76a1,
 *          title: T-shirts,
 *          createdAt: 2021-06-02T07:46:19.937Z,
 *          updatedAt: 2021-06-02T07:46:19.937Z,
 *          __v: 0,
 *          }
 *        ]
 *        message: Categories found.
 *  parameters:
 *    in: path
 *    name: id
 *    schema:
 *      type: string
 *    required: true
 *    description: The category id.
 *  responses:
 *    404NotFound:
 *      description: Not found.
 *    500ServerError:
 *      description: Server Error
 */

/**
 * @swagger
 * tags:
 *  name: Categories
 *  description: The categories managing API
 */

/**
 * @swagger
 * /categories:
 *    get:
 *      summary: Returns the list of all categories.
 *      tags: [Categories]
 *      responses:
 *        200:
 *          description: The list of the categories.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schema/Response"
 *        404:
 *          $ref: "#/components/responses/404NotFound"
 *        500:
 *          $ref: "#/components/responses/500ServerError"
 */

router
  .route("/")
  .get(CategoryController.getAllCategory)
  .post(verifyAuth, CategoryController.createNewCategory);

/**
 * @swagger
 * /categories/{id}:
 *    get:
 *      summary: Returns a category by id
 *      tags: [Categories]
 *      parameters:
 *        - $ref: "#/components/parameters"
 *      responses:
 *        200:
 *          description: The category description by id
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schema/Category"
 *        404:
 *          $ref: "#/components/responses/404NotFound"
 *        500:
 *          $ref: "#/components/responses/500ServerError"
 */

router
  .route("/:id")
  .get(CategoryController.getCategoryById)
  .post(verifyAuth, CategoryController.updateCategoryById)
  .delete(verifyAuth, CategoryController.deleteCategoryById);

module.exports = router;
