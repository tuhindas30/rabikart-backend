const express = require("express");
const router = express.Router();

const CartController = require("../controllers/cart.controller");
const WishlistController = require("../controllers/wishlist.controller");
const UserController = require("../controllers/user.controller");

const { verifyAuth } = require("../middlewares/verifyAuth");

router.get("/", UserController.getAllUsers);

router.use(verifyAuth);
router
  .route("/cart")
  .get(CartController.getCartByUserId)
  .post(CartController.addToCart)
  .put(CartController.updateItemQuantity);

router
  .route("/wishlist")
  .get(WishlistController.getWishlistByUserId)
  .post(WishlistController.addToWishlist)
  .delete(WishlistController.removeFromWishlist);

router
  .route("/:id")
  .get(UserController.getUserById)
  .post(UserController.updateUserById)
  .delete(UserController.deleteUserById);

module.exports = router;
