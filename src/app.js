require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const productRoutes = require("./routes/product")
const authRoutes = require("./routes/AuthRouter")
const app = express()
const cartRoutes = require("./routes/CartRouter")




app.use(cookieParser())
app.use(express.json())

// console.log("productRoutes:", typeof productRoutes)
// console.log("authRoutes:", typeof authRoutes)

app.use("/api", productRoutes)
app.use("/api", authRoutes)
app.use("/api",cartRoutes)

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
