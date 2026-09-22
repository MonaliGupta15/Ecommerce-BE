const Product = require("../Models/Product");

// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();

    res.status(201).json({
      success: true,
      message: "Product saved Successfully",
      data: savedProduct
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const defaultProducts = require("../default_products.json");

// READ ALL PRODUCTS
const getProducts = async (req, res) => {
  try {
    let products = await Product.find();

    // Auto-replenish: If products count drops below 32 (even down to 8),
    // automatically restore any missing products on the next visit so it always stays at 32 products!
    if (products.length < defaultProducts.length) {
      const existingNames = new Set(products.map((p) => p.name));
      const missingProducts = defaultProducts.filter(
        (p) => !existingNames.has(p.name)
      );

      if (missingProducts.length > 0) {
        await Product.insertMany(missingProducts);
        products = await Product.find();
      }
    }

    res.json({
      success: true,
      data: products
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    // Demo protection: pause deletion if catalog drops to 8 or fewer items
    const totalCount = await Product.countDocuments();
    if (totalCount <= 8) {
      return res.status(403).json({
        success: false,
        message: "Demo Protection: Deletion paused at 8 items. Simply refresh the page to restore all 32 products!"
      });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE PRODUCT
const editProduct = async (req, res) => {
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
};

module.exports = {
  createProduct,
  getProducts,
  deleteProduct,
  editProduct
};
