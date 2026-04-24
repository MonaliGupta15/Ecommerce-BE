const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 15,
      trim: true
    },

    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 15,
      trim: true
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 20,
      immutable: true
    },

    role: {
      type: String,
      enum: ["buyer", "seller"],
      default: "buyer"
    },

    profilePicture: {
      type: String,
      default: ""
    },

    mobileNo: {
      type: String,
      required: true,
      match: [/^[6-9]\d{9}$/, "Please enter a valid mobile number"]
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false
    },

    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        },
        quantity: {
          type: Number,
          default: 1
        }
      }
    ],

    // ✅ NEW: addresses array
    addresses: [
      {
        fullName:  { type: String, required: true },
        mobile:    { type: String, required: true },
        pincode:   { type: String, required: true },
        street:    { type: String, required: true },
        city:      { type: String, required: true },
        state:     { type: String, required: true },
        isDefault: { type: Boolean, default: false }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
