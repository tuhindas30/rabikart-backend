const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/product.controller");
const { verifyAuth } = require("../middlewares/verifyAuth");

/**
 * @swagger
 * components:
 *  schema:
 *    Product:
 *      type: object
 *      required:
 *        - modelName
 *        - modelNo
 *        - imageUrl
 *        - price
 *        - seller
 *      properties:
 *        _id:
 *          type: string
 *          description: The auto generated id of the product.
 *        modelName:
 *          type: string
 *          description: The model name of the product.
 *        modelNo:
 *          type: string
 *          description: The model number of the product.
 *        imageUrl:
 *          type: string
 *          description: The image url of the product.
 *        avgRating:
 *          type: number
 *          description: The average rating of the product.
 *        price:
 *          type: number
 *          description: The price of the product.
 *        discount:
 *          type: number
 *          description: The discount percent of the product.
 *        discountPrice:
 *          type: number
 *          description: The discount price of the product.
 *        inStock:
 *          type: boolean
 *          description: The availability of the product.
 *        fastDelivery:
 *          type: boolean
 *          description: The fast delivery possibility of the product.
 *        maxQuantity:
 *          type: number
 *          description: The maximum quantity of the product that can be bought in one order.
 *        category:
 *          type: string
 *          description: The category id of the product.
 *        seller:
 *          type: string
 *          description: The seller of the product.
 *        sellerRating:
 *          type: string
 *          description: The seller rating of the product.
 *        description:
 *          type: string
 *          description: The description of the product.
 *        productLink:
 *          type: string
 *          description: The buy link of the product.
 *        highlights:
 *          type: array
 *          description: The highlighted specs of the product.
 *        createdAt:
 *          type: string
 *          description: The creation time of the product.
 *        updatedAt:
 *          type: string
 *          description: The updation time of the product.
 *        __v:
 *          type: number
 *          description: The version of the product.
 *      example:
 *        _id: 2358c5821a83471c615f86a1
 *        modelName: Guitar
 *        modelNo: GUITAR-1234
 *        imageUrl: https://image.example.com
 *        avgRating: 3.4
 *        price: 1000
 *        discount: 45
 *        discountPrice: 550
 *        inStock: true
 *        fastDelivery: true
 *        maxQuantity: 2
 *        category: 6458c5821a88421c665f76a1
 *        seller: Guitar Shop
 *        sellerRating: 4
 *        description: Brand new guitar with elegant design
 *        productLink: https://example.com
 *        highlights: [{_id: 60b7e2f2c37128037b2ba352, label: Type, value: Acoutic}]
 *        createdAt: 2021-06-02T07:46:19.937Z
 *        updatedAt: 2021-06-02T07:46:19.937Z
 *        __v: 0
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
 *      description: Server Error.
 */

/**
 * @swagger
 * tags:
 *  name: Products
 *  description: The products managing API
 */

/**
 * @swagger
 * /products:
 *    get:
 *      summary: Returns the list of all products.
 *      tags: [Products]
 *      responses:
 *        200:
 *          description: The list of the products.
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schema/Product"
 *        404:
 *          $ref: "#/components/responses/404NotFound"
 *        500:
 *          $ref: "#/components/responses/500ServerError"
 */

router
  .route("/")
  .get(ProductController.getAllProducts)
  .post(verifyAuth, ProductController.createNewProduct);

/**
 * @swagger
 * /products/{id}:
 *    get:
 *      summary: Returns a product by id.
 *      tags: [Products]
 *      parameters:
 *        - $ref: "#/components/schema/parameters"
 *      responses:
 *        200:
 *          description: The product description by id.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schema/Product"
 *        404:
 *          description: The category was not found.
 *        500:
 *          $ref: "#/components/responses/500ServerError"
 */

router
  .route("/:id")
  .get(ProductController.getProductById)
  .post(verifyAuth, ProductController.updateProductById)
  .delete(verifyAuth, ProductController.deleteProductById);

module.exports = router;
