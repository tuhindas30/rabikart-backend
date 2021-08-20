const express = require("express");
const router = express.Router();

const CartController = require("../controllers/cart.controller");
const WishlistController = require("../controllers/wishlist.controller");
const OrderController = require("../controllers/order.controller");
const UserController = require("../controllers/user.controller");
const Validator = require("../middlewares/validator");

const { verifyAuth } = require("../middlewares/verifyAuth");

router.use(verifyAuth);

/**
 * @swagger
 * components:
 *  schema:
 *    Product:
 *      type: object
 *      properties:
 *        product:
 *          type: object
 *          properties:
 *            _id:
 *              type: string
 *              description: The auto generated id of the product.
 *            modelName:
 *              type: string
 *              description: The model name of the product.
 *            modelNo:
 *              type: string
 *              description: The model number of the product.
 *            imageUrl:
 *              type: string
 *              description: The image url of the product.
 *            avgRating:
 *              type: number
 *              description: The average rating of the product.
 *            price:
 *              type: number
 *              description: The price of the product.
 *            discount:
 *              type: number
 *              description: The discount percent of the product.
 *            discountPrice:
 *              type: number
 *              description: The discount price of the product.
 *            inStock:
 *              type: boolean
 *              description: The availability of the product.
 *            fastDelivery:
 *              type: boolean
 *              description: The fast delivery possibility of the product.
 *            maxQuantity:
 *              type: number
 *              description: The maximum quantity of the product that can be bought in one order.
 *            category:
 *              type: string
 *              description: The category id of the product.
 *            seller:
 *              type: string
 *              description: The seller of the product.
 *            sellerRating:
 *              type: string
 *              description: The seller rating of the product.
 *            description:
 *              type: string
 *              description: The description of the product.
 *            productLink:
 *              type: string
 *              description: The buy link of the product.
 *            highlights:
 *              type: array
 *              description: The highlighted specs of the product.
 *            createdAt:
 *              type: string
 *              description: The creation time of the product.
 *            updatedAt:
 *              type: string
 *              description: The updation time of the product.
 *            __v:
 *              type: number
 *              description: The version of the product.
 *        quantity:
 *          type: number
 *          description: Denotes the current product quantity.
 *    Cart:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *          description: The status of the request.
 *        data:
 *          type: object
 *          properties:
 *            totalPrice:
 *              type: number
 *              description: The total price of the cart items.
 *            _id:
 *              type: string
 *              description: The auto generated id of the cart.
 *            user:
 *              type: string
 *              description: The user id of the cart.
 *            items:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schema/Product"
 *              description: The cart items of the user.
 *            createdAt:
 *              type: string
 *              description: The creation time of the cart.
 *            updatedAt:
 *              type: string
 *              description: The updation time of the cart.
 *            __v:
 *              type: number
 *              description: The version of the cart.
 *        message:
 *          type: string
 *          description: A feedback message of the request.
 *      example:
 *        status: SUCCESS
 *        data:
 *           totalPrice: 26764
 *           _id: 60bb04c6f0c9d21a0297f3e6
 *           user: 60b922c8c1c882001530ecb0
 *           items: []
 *           createdAt: 2021-06-05T04:59:50.748Z
 *           updatedAt: 2021-08-15T05:15:54.758Z
 *           __v: 123
 *        message: Cart found.
 *    Wishlist:
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *          description: The status of the request.
 *        data:
 *          type: object
 *          properties:
 *            _id:
 *              type: string
 *              description: The auto generated id of the wishlist.
 *            user:
 *              type: string
 *              description: The user id of the wishlist.
 *            items:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schema/Product"
 *              description: The wishlist items of the user.
 *            createdAt:
 *              type: string
 *              description: The creation time of the wishlist.
 *            updatedAt:
 *              type: string
 *              description: The updation time of the wishlist.
 *            __v:
 *              type: number
 *              description: The version of the wishlist.
 *        message:
 *          type: string
 *          description: A feedback message of the request.
 *      example:
 *        status: SUCCESS
 *        data:
 *           _id: 60bb04c6f0c9d21a0297f3e6
 *           user: 60b922c8c1c882001530ecb0
 *           items: []
 *           createdAt: 2021-06-05T04:59:50.748Z
 *           updatedAt: 2021-08-15T05:15:54.758Z
 *           __v: 123
 *        message: Wishlist found.
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
 *    403Forbidden:
 *      description: Forbidden. Unauthorized.
 *    404NotFound:
 *      description: Not found.
 *    500ServerError:
 *      description: Server Error.
 */

/**
 * @swagger
 * tags:
 *  name: User
 *  description: The user managing API
 */

router.get("/", UserController.getAllUsers);

/**
 * @swagger
 * /users/cart:
 *    get:
 *      summary: Returns current user cart details.
 *      tags: [User]
 *      security:
 *       - bearerAuth: []
 *      responses:
 *        200:
 *          description: The current user cart details.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schema/Cart"
 *        401:
 *          $ref: "#/components/responses/401BadReq"
 *        403:
 *          $ref: "#/components/responses/403Forbidden"
 *        404:
 *          $ref: "#/components/responses/404NotFound"
 *        500:
 *          $ref: "#/components/responses/500ServerError"
 *    post:
 *      summary: Adds new product to the cart.
 *      tags: [User]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        requires: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                productId:
 *                  type: string
 *                  description: The id of the product to be added to cart.
 *                quantity:
 *                  type: number
 *                  description: The quantity of the product to be added to cart.
 *              example:
 *                productId: 60b7e2f3c37108037b6ba35b
 *                quantity: 1
 *      responses:
 *        200:
 *          description: The current user cart details.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schema/Cart"
 *        401:
 *          $ref: "#/components/responses/401BadReq"
 *        403:
 *          $ref: "#/components/responses/403Forbidden"
 *        404:
 *          $ref: "#/components/responses/404NotFound"
 *        500:
 *          $ref: "#/components/responses/500ServerError"
 *    put:
 *      summary: Updates product quantity to the cart.
 *      tags: [User]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        requires: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                productId:
 *                  type: string
 *                  description: The id of the product to be updated in the cart.
 *                quantity:
 *                  type: number
 *                  description: The quantity of the product to be updated in cart.
 *              example:
 *                productId: 60b7e2f3c37108037b6ba35b
 *                quantity: 2
 *      responses:
 *        200:
 *          description: The updated cart with updated product quantity.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schema/Cart"
 *        401:
 *          $ref: "#/components/responses/401BadReq"
 *        403:
 *          $ref: "#/components/responses/403Forbidden"
 *        404:
 *          $ref: "#/components/responses/404NotFound"
 *        500:
 *          $ref: "#/components/responses/500ServerError"
 */

router
  .route("/cart")
  .get(CartController.getCartByUserId)
  .post(Validator.validateCartItem, CartController.addToCart)
  .put(Validator.validateCartItem, CartController.updateItemQuantity);

router.post(
  "/cart/sync",
  Validator.validateCartSyncedItem,
  CartController.updateCart
);

/**
 * @swagger
 * /users/wishlist:
 *    get:
 *      summary: Returns current user wishlist details.
 *      tags: [User]
 *      security:
 *       - bearerAuth: []
 *      responses:
 *        200:
 *          description: The current user wishlist details.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schema/Wishlist"
 *        401:
 *          $ref: "#/components/responses/401BadReq"
 *        403:
 *          $ref: "#/components/responses/403Forbidden"
 *        404:
 *          $ref: "#/components/responses/404NotFound"
 *        500:
 *          $ref: "#/components/responses/500ServerError"
 *    post:
 *      summary: Adds new product to the wishlist.
 *      tags: [User]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        requires: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                productId:
 *                  type: string
 *                  description: The id of the product to be added to cart.
 *              example:
 *                productId: 60b7e2f3c37108037b6ba35b
 *      responses:
 *        200:
 *          description: The current user updated wishlist details.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schema/Wishlist"
 *        401:
 *          $ref: "#/components/responses/401BadReq"
 *        403:
 *          $ref: "#/components/responses/403Forbidden"
 *        404:
 *          $ref: "#/components/responses/404NotFound"
 *        500:
 *          $ref: "#/components/responses/500ServerError"
 */

router
  .route("/wishlist")
  .get(WishlistController.getWishlistByUserId)
  .post(Validator.validateProductId, WishlistController.addToWishlist);

router
  .route("/orders")
  .get(OrderController.getOrdersByUserId)
  .post(OrderController.initiateOrder);

router.post("/orders/confirm", OrderController.confirmOrder);

/**
 * @swagger
 * /users/wishlist/{id}:
 *    delete:
 *      summary: Deletes the product from the wishlist.
 *      tags: [User]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The product id.
 *      responses:
 *        200:
 *          description: The updated wishlist.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schema/Wishlist"
 *        401:
 *          $ref: "#/components/responses/401BadReq"
 *        403:
 *          $ref: "#/components/responses/403Forbidden"
 *        404:
 *          $ref: "#/components/responses/404NotFound"
 *        500:
 *          $ref: "#/components/responses/500ServerError"
 */

router.delete("/wishlist/:productId", WishlistController.removeFromWishlist);

/**
 * @swagger
 * /users/{id}:
 *    get:
 *      summary: Get the current user details.
 *      tags: [User]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: The user id.
 *      responses:
 *        200:
 *          description: The current user details.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schema/User"
 *        401:
 *          $ref: "#/components/responses/401BadReq"
 *        403:
 *          $ref: "#/components/responses/403Forbidden"
 *        404:
 *          $ref: "#/components/responses/404NotFound"
 *        500:
 *          $ref: "#/components/responses/500ServerError"
 */

router
  .route("/:id")
  .get(UserController.getUserById)
  .post(Validator.validateEmail, UserController.updateUserById)
  .delete(UserController.deleteUserById);

module.exports = router;
