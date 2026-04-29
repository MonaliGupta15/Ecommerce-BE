require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const productRoutes  = require("./routes/product");
const authRoutes     = require("./routes/AuthRouter");
const cartRoutes     = require("./routes/CartRouter");
const orderRoutes    = require("./routes/OrderRouter");
const addressRoutes  = require("./routes/AddressRouter");

const app = express();

const corsOptions = {
  origin: function(origin, callback) {
    const allowed = [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://ecommerce-frontend-cyan-ten.vercel.app"
    ];
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/products",  productRoutes);
app.use("/api/auth",      authRoutes);
app.use("/api/cart",      cartRoutes);
app.use("/api/orders",    orderRoutes);
app.use("/api/addresses", addressRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connected Successfully");
    app.listen(process.env.PORT || 8080, () => {
      console.log("Server running on:", process.env.PORT || 8080);
    });
  })
  .catch((err) => {
    console.log("DB Connection Failed", err.message);
  });

module.exports = app;