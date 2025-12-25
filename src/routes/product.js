const express = require("express");
const router = express.Router();
const Product = require("../models/product");


// CREATE PRODUCT (POST)

router.post("/", async (req, res) => {

  try {

    //get data 
    const product = new Product(req.body);  

    //save product to database
    const savedProduct = await product.save();

    //send response
    res.status(201).json({
      success: true,
      message:"Product saved Successfully",
      data: savedProduct
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});


// READ ALL PRODUCTS (GET)

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// DELETE PRODUCT (DELETE)

router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// UPDATE PRODUCT (PATCH)

router.patch("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      data: updatedProduct
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


module.exports = router;