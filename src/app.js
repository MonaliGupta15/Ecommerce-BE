require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")

const productRoutes = require("./routes/product")
const authRoutes = require("./routes/AuthRouter")
const cartRoutes = require("./routes/CartRouter")
const orderRoutes = require("./routes/OrderRouter")

const app = express()

app.use(cookieParser())
app.use(express.json())


app.use("/api/products", productRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/orders", orderRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("DB Connected Successfully")
  app.listen(process.env.PORT, () => {
    console.log("Server running on:", process.env.PORT)
  })
})
.catch(() => {
  console.log("DB Connection Failed")
})
