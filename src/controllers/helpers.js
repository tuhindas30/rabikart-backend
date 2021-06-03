const { Cart } = require("../models/cart.model");
const { Wishlist } = require("../models/wishlist.model");
const { Product } = require("../models/product.model");
const { User } = require("../models/user.model");
const { HttpError } = require("../utils/helper");

const findCartByUserId = async (userId) => {
  let userCart = await Cart.findOne({ user: userId }).populate("items.product");
  if (userCart) {
    userCart.calculateTotalPrice();
    userCart = await userCart.save();
  }
  return userCart;
};

const findWishlistByUserId = async (userId) => {
  const wishlist = await Wishlist.findOne({ user: userId }).populate(
    "items.product"
  );
  return wishlist;
};

const handleDuplicateCartItems = async (cart, productId, quantity) => {
  const itemIndex = cart.items.findIndex(
    (item) => item.product._id == productId
  );
  if (itemIndex > -1) {
    cart.increaseItemQuantity(itemIndex, quantity);
  } else {
    cart.items.push({ product: productId, quantity });
  }
  await cart.populate("items.product").execPopulate();
  cart.calculateTotalPrice();
  cart = await cart.save();
  return cart;
};

const handleDuplicateWishlistItems = async (wishlist, productId) => {
  if (wishlist.items.some((item) => item.product._id == productId)) {
    return wishlist;
  }
  wishlist.items.push({ product: productId });
  await wishlist.populate("items.product").execPopulate();
  wishlist = await wishlist.save();
  return wishlist;
};

const handleUpdateCartItem = async (cart, productId, quantity) => {
  const itemIndex = cart.items.findIndex(
    (item) => item.product._id == productId
  );
  if (itemIndex > -1) {
    cart.updateItemQuantity(itemIndex, quantity);
  } else {
    cart.items.push({ product: productId, quantity: quantity });
  }
  await cart.populate("items.product").execPopulate();
  cart.calculateTotalPrice();
  cart = await cart.save();
  return cart;
};

const createNewCart = async (userId, productId, quantity) => {
  let newCart = new Cart({
    user: userId,
    items: [
      {
        product: productId,
        quantity,
      },
    ],
  });
  await newCart.populate("items.product").execPopulate();
  newCart.calculateTotalPrice();
  newCart = await newCart.save();
  return newCart;
};

const createNewWishlist = async (userId, productId) => {
  let newWishlist = new Wishlist({
    user: userId,
    items: [
      {
        product: productId,
      },
    ],
  });
  await newWishlist.populate("items.product").execPopulate();
  newWishlist = await newWishlist.save();
  return newWishlist;
};

const doesProductExist = async (productId) => {
  const product = await Product.findById(productId).populate("category");
  if (!product) {
    throw new HttpError(404, `Product ${productId} does not exists`);
  }
  return product;
};

const doesCategoryExist = (category) => {
  if (!category) {
    throw new HttpError(404, "Category does not exist");
  }
};

const doesUserExist = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new HttpError(404, "User does not exist");
  }
  return user;
};

module.exports = {
  findCartByUserId,
  findWishlistByUserId,
  handleDuplicateCartItems,
  handleDuplicateWishlistItems,
  handleUpdateCartItem,
  createNewCart,
  createNewWishlist,
  doesProductExist,
  doesCategoryExist,
  doesUserExist,
};
