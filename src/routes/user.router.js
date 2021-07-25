const express = require("express");
const router = express.Router();

const CartController = require("../controllers/cart.controller");
const WishlistController = require("../controllers/wishlist.controller");
const UserController = require("../controllers/user.controller");
const Validator = require("../middlewares/validator");

const { verifyAuth } = require("../middlewares/verifyAuth");

router.use(verifyAuth);

router.get("/", UserController.getAllUsers);

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

router
  .route("/wishlist")
  .get(WishlistController.getWishlistByUserId)
  .post(Validator.validateProductId, WishlistController.addToWishlist);

router.delete("/wishlist/:productId", WishlistController.removeFromWishlist);

router
  .route("/:id")
  .get(UserController.getUserById)
  .post(Validator.validateEmail, UserController.updateUserById)
  .delete(UserController.deleteUserById);

module.exports = router;
