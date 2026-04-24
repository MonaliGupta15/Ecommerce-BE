const Product = require("../Models/Product");

// ADD PRODUCT TO CART
const addToCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = req.user;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cartItem = user.cart.find(
      item => item.product.toString() === productId
    );

    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      user.cart.push({ product: productId, quantity: 1 });
    }

    await user.save();

    res.json({
      success: true,
      message: "Product added to cart",
      cart: user.cart
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GET CART
const getCart = async (req, res) => {
  const user = await req.user.populate("cart.product");
  res.json(user.cart);
};


// REMOVE ITEM
const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  req.user.cart = req.user.cart.filter(
    item => item.product.toString() !== productId
  );

  await req.user.save();

  res.json({
    success: true,
    message: "Item removed from cart"
  });
};


// UPDATE QUANTITY
const updateQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const cartItem = req.user.cart.find(
      item => item.product.toString() === productId
    );

    if (!cartItem) {
      return res.status(400).json({ message: "Item not found in cart" });
    }

    cartItem.quantity = quantity;

    if (cartItem.quantity <= 0) {
      req.user.cart = req.user.cart.filter(
        item => item.product.toString() !== productId
      );
    }

    await req.user.save();

    res.json({
      success: true,
      message: "Quantity updated",
      cart: req.user.cart
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity
};
