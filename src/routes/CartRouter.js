const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../Middlewares/isLoggedIn");
const { isBuyer } = require("../Middlewares/isBuyer");

const {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity
} = require("../Controllers/BuyerController");

router.post("/add/:productId", isLoggedIn, isBuyer, addToCart);
router.get("/", isLoggedIn, isBuyer, getCart);
router.delete("/remove/:productId", isLoggedIn, isBuyer, removeFromCart);
router.patch("/update/:productId", isLoggedIn, isBuyer, updateQuantity);

module.exports = router;
