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

const allowedOrigins = [
  "https://ecommerce-frontend-cyan-ten.vercel.app"
];

const corsOptions = {
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);

    // Allow any localhost / 127.0.0.1 port in development (e.g. 5173, 5174, 5175, etc.)
    if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
      return callback(null, true);
    }

    return callback(null, false);
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

console.log("Connecting to MongoDB...");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connected Successfully");
    app.listen(process.env.PORT || 8080, () => {
      console.log("Server running on:", process.env.PORT || 8080);
    });
  })
  .catch((err) => {
    console.log("DB Connection Failed:", err.message);
  });

module.exports = app;