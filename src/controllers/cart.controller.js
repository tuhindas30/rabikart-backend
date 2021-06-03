const { HttpError } = require("../utils/helper");
const {
  findCartByUserId,
  handleDuplicateCartItems,
  handleUpdateCartItem,
  createNewCart,
  doesProductExist,
} = require("./helpers");

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
  let cart = await findCartByUserId(userId);
  try {
    await doesProductExist(productId);
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

module.exports = { getCartByUserId, addToCart, updateItemQuantity };
