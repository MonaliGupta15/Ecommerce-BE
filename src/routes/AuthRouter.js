const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");


// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      password,
      mobileNo,
      role,
      profilePicture
    } = req.body;

    const foundUser = await User.findOne({
      $or: [{ username }, { mobileNo }]
    });

    if (foundUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      username,
      password: hashedPassword,
      mobileNo,
      role,
      profilePicture
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});


// ================= LOGIN + JWT =================
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password"
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    // ✅ STORE TOKEN IN COOKIE
    res
      .cookie("loginToken", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "strict"
      })
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        data: {
          id: user._id,
          username: user.username,
          role: user.role
        }
      });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});


// ================= LOGOUT =================
router.post("/logout", (req, res) => {
  res
    .clearCookie("loginToken", {
      httpOnly: true,
      sameSite: "strict"
    })
    .status(200)
    .json({
      success: true,
      message: "Logout successful"
    });
});

module.exports = router;
