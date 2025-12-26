const Product = require("../Models/Product")

const addProduct = async (req, res) => {
  try {
    const { id, q } = req.query

    const foundProduct = await Product.findById(id)
    if (!foundProduct) {
      throw new Error("Product does not exist")
    }

    const prevCart = req.user.cart
    let isProduct = false

    for (let item of prevCart) {
      if (item.product.toString() === id.toString()) {
        isProduct = true
        item.quantity = q
        break
      }
    }

    if (!isProduct) {
      req.user.cart.push({
        product: foundProduct._id,
        quantity: q
      })
    }

    const cart = await req.user.save()

    res.status(200).json({
      success: true,
      data: cart.cart
    })

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  addProduct
}
