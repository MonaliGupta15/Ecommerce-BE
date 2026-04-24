const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../Middlewares/isLoggedIn");
const { isBuyer } = require("../Middlewares/isBuyer");

const { checkout, getOrders } = require("../Controllers/OrderController");

router.post("/checkout", isLoggedIn, isBuyer, checkout);
router.get("/", isLoggedIn, isBuyer, getOrders); // ✅ NEW

module.exports = router;
