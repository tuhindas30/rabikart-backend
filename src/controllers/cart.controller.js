const { HttpError } = require("../utils/helper");
const {
  findCartByUserId,
  handleDuplicateCartItems,
  handleUpdateCartItem,
  createNewCart,
  doesProductExist,
} = require("./helpers");
const { Cart } = require("../models/cart.model");

const getCartByUserId = async (req, res, next) => {
  const { userId } = req;
  try {
    const cart = await findCartByUserId(userId);
    if (!cart) {
      throw new HttpError(404, "No cart data found");
    }
    res.json({
      status: "SUCCESS",
      data: cart,
      message: "Cart found",
    });
  } catch (err) {
    next(err);
  }
};

const addToCart = async (req, res, next) => {
  const { productId, quantity } = req.body;
  let { userId } = req;
  try {
    await doesProductExist(productId);
    let cart = await findCartByUserId(userId);
    if (cart) {
      cart = await handleDuplicateCartItems(cart, productId, quantity);
      if (quantity < 1) {
        return res.json({
          status: "SUCCESS",
          data: cart,
          message: `Product ${productId} removed from cart successfully`,
        });
      }
      return res.json({
        status: "SUCCESS",
        data: cart,
        message: `Product ${productId} of quantity ${quantity} added to cart successfully`,
      });
    }
    const newCart = await createNewCart(userId, productId, quantity);
    return res.json({
      status: "SUCCESS",
      data: newCart,
      message: `New cart created with product ${productId} of quantity ${quantity} successfully`,
    });
  } catch (err) {
    next(err);
  }
};

const updateItemQuantity = async (req, res, next) => {
  const { productId, quantity } = req.body;
  const { userId } = req;
  try {
    await doesProductExist(productId);
    let cart = await findCartByUserId(userId);
    if (cart) {
      cart = await handleUpdateCartItem(cart, productId, quantity);
      if (quantity < 1) {
        return res.json({
          status: "SUCCESS",
          data: cart,
          message: `Product ${productId} removed from cart successfully`,
        });
      }
      return res.json({
        status: "SUCCESS",
        data: cart,
        message: `Product ${productId} of quantity ${quantity} updated successfully`,
      });
    }
    const newCart = await createNewCart(userId, productId, quantity);
    return res.json({
      status: "SUCCESS",
      data: newCart,
      message: `New cart created with product ${productId} of quantity ${quantity} successfully`,
    });
  } catch (err) {
    next(err);
  }
};

const updateCart = async (req, res, next) => {
  const cartItems = req.body;
  const { userId } = req;
  try {
    if (!Array.isArray(cartItems)) {
      throw new HttpError(400, "cart should be an array");
    }
    let cart = await findCartByUserId(userId);
    if (cart) {
      for (let i = 0; i < cartItems.length; i++) {
        let item = cartItems[i];
        await doesProductExist(item.product._id);
        cart = await handleUpdateCartItem(
          cart,
          item.product._id,
          item.quantity
        );
      }
      return res.json({
        status: "SUCCESS",
        data: cart,
        message: "Cart updated successfully",
      });
    }
    let newCart = new Cart({ user: userId });
    cartItems.forEach((item) => {
      newCart.items.push({
        product: item.product._id,
        quantity: item.quantity,
      });
    });
    await newCart.populate("items.product").execPopulate();
    newCart.calculateTotalPrice();
    newCart = await newCart.save();
    return res.json({
      status: "SUCCESS",
      data: newCart,
      message: "New cart created and updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getCartByUserId, addToCart, updateItemQuantity, updateCart };
