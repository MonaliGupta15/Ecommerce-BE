const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../Middlewares/isLoggedIn");
const { isSeller } = require("../Middlewares/isSeller");
const { isBuyer } = require("../Middlewares/isBuyer");

const {
  createProduct,
  getProducts,
  deleteProduct,
  editProduct
} = require("../Controllers/ProductController");

// SELLER ROUTES
router.post("/", isLoggedIn, isSeller, createProduct);
router.patch("/:id", isLoggedIn, isSeller, editProduct);
router.delete("/:id", isLoggedIn, isSeller, deleteProduct);

// ALL USERS (BUYER, SELLER, GUEST) CAN VIEW PRODUCTS
router.get("/", getProducts);

module.exports = router;

