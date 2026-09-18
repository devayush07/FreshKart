import User from "../models/user.model.js";

// @desc     update user cartData
// @route    PUT /api/cart/update
export const updateCart = async (req, res) => {
  try {
    const userId = req.user;
    const { cartItems } = req.body;
    await User.findByIdAndUpdate(userId, { cartItems }, { new: true });
    res.status(200).json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.log("Error in updateCart controller", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// @desc    Get user cart items
// @route   GET /api/cart/:id
export const getUserCart = async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized user", success: false });
    }
    const cart = user?.cartItems;
    return res
      .status(200)
      .json({ message: "Cart item fetched", success: true, cart });
  } catch (error) {
    console.log("Error in getUserCart controller", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
