const { HttpError } = require("../utils/helper");
const {
  findWishlistByUserId,
  handleDuplicateWishlistItems,
  createNewWishlist,
  doesProductExist,
} = require("./helpers");

const getWishlistByUserId = async (req, res, next) => {
  const { userId } = req;
  try {
    const wishlist = await findWishlistByUserId(userId);
    if (!wishlist) {
      throw new HttpError(404, "No wishlist data found");
    }
    res.json({
      status: "SUCCESS",
      data: wishlist,
      message: "Wishlist found",
    });
  } catch (err) {
    next(err);
  }
};

const addToWishlist = async (req, res, next) => {
  const { productId } = req.body;
  const { userId } = req;
  try {
    await doesProductExist(productId);
    let wishlist = await findWishlistByUserId(userId);
    if (wishlist) {
      wishlist = await handleDuplicateWishlistItems(wishlist, productId);
      return res.json({
        status: "SUCCESS",
        data: wishlist,
        message: `Product ${productId} added to wishlist`,
      });
    }
    const newWishlist = await createNewWishlist(userId, productId);
    return res.json({
      status: "SUCCESS",
      data: newWishlist,
      message: `New wishlist created with product ${productId}`,
    });
  } catch (err) {
    next(err);
  }
};

const removeFromWishlist = async (req, res, next) => {
  const { productId } = req.params;
  const { userId } = req;
  try {
    await doesProductExist(productId);
    let wishlist = await findWishlistByUserId(userId);
    const itemIndex = wishlist.items.findIndex(
      (item) => item.product._id == productId
    );
    if (itemIndex > -1) {
      wishlist.items.splice(itemIndex, 1);
      await wishlist.populate("items.populate");
      wishlist = await wishlist.save();
      return res.json({
        status: "SUCCESS",
        data: wishlist,
        message: `Product ${productId} removed from wishlist successfully`,
      });
    }
    throw new HttpError(401, "Product does not exist in wishlist");
  } catch (err) {
    next(err);
  }
};

module.exports = { getWishlistByUserId, addToWishlist, removeFromWishlist };
