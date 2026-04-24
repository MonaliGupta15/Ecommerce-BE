const Order = require("../Models/Order");
const Product = require("../Models/Product");

// CHECKOUT
const checkout = async (req, res) => {
  try {
    const user = req.user;

    if (!user.cart || user.cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;

    for (let item of user.cart) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(400).json({ message: "Product not found during checkout" });
      }
      totalAmount += product.price * item.quantity;
    }

    const order = new Order({
      user: user._id,
      items: user.cart,
      totalAmount
    });

    await order.save();

    user.cart = [];
    await user.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ GET ALL ORDERS FOR LOGGED IN USER
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product")
      .sort({ createdAt: -1 }); // newest first

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  checkout,
  getOrders
};
