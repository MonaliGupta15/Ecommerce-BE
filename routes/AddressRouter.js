const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../Middlewares/isLoggedIn");
const { isBuyer }    = require("../Middlewares/isBuyer");
const { getAddresses, addAddress, deleteAddress } = require("../Controllers/AddressController");

router.get("/",        isLoggedIn, isBuyer, getAddresses);
router.post("/",       isLoggedIn, isBuyer, addAddress);
router.delete("/:id",  isLoggedIn, isBuyer, deleteAddress);

module.exports = router;
