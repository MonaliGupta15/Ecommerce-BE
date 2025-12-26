const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../Middlewares/isLoggedIn");
const { isBuyer } = require("../Middlewares/isBuyer");

const { checkout } = require("../Controllers/OrderController");

router.post("/checkout", isLoggedIn, isBuyer, checkout);

module.exports = router;
