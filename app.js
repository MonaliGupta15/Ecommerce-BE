require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const productRoutes = require("./routes/product");
const authRoutes = require("./routes/AuthRouter");
const cartRoutes = require("./routes/CartRouter");
const orderRoutes = require("./routes/OrderRouter");
const addressRoutes = require("./routes/AddressRouter");

const app = express();

// ✅ FIX 1: removed trailing slash from frontend URL
// ✅ FIX 2: added app.options for preflight
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://ecommerce-frontend-cyan-ten.vercel.app" 
    ],
    credentials: true
  })
);
app.options("*", cors()); 

app.use(cookieParser());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/addresses", addressRoutes);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connected Successfully");
  })
  .catch((error) => {
    console.log("DB Connection Failed", error.message);
  });

module.exports = app; 
