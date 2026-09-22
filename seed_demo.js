require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  const hash = await bcrypt.hash("password123", 10);
  const db = mongoose.connection.db;

  await db.collection("users").updateOne(
    { username: "demobuyer" },
    {
      $set: {
        firstName: "Demo",
        lastName: "Buyer",
        username: "demobuyer",
        password: hash,
        role: "buyer",
        mobileNo: "9876543210",
        cart: [],
        addresses: [
          {
            fullName: "Demo Buyer",
            mobile: "9876543210",
            pincode: "110001",
            street: "42 Tech Park, Connaught Place",
            city: "New Delhi",
            state: "Delhi",
            isDefault: true
          }
        ]
      }
    },
    { upsert: true }
  );

  await db.collection("users").updateOne(
    { username: "demoseller" },
    {
      $set: {
        firstName: "Demo",
        lastName: "Seller",
        username: "demoseller",
        password: hash,
        role: "seller",
        mobileNo: "9876543211",
        cart: [],
        addresses: []
      }
    },
    { upsert: true }
  );

  console.log("SUCCESS_SEED_DEMO_USERS");
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
