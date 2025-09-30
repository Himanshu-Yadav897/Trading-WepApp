const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const Transaction = require("../models/transactionModel");
const Product = require("../models/productModel");
const User = require("../models/user");

const router = express.Router();

//  POST api/transactions/buy for buy a product
router.post("/buy", protect, async (req, res) => {
  try {
    const { productId, units } = req.body;
    const user = req.user; // We get this from the 'protect' middleware

    // 1. Find the product the user wants to buy
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // 2. Calculate total cost
    const totalCost = product.price * units;

    // 3. Check if user has enough balance
    if (user.walletBalance < totalCost) {
      return res.status(400).json({ message: "Insufficient wallet balance." });
    }

    // 4. Deduct cost from user's wallet and save the user
    // We need to fetch the user again to use .save()
    const userToUpdate = await User.findById(user._id);
    userToUpdate.walletBalance -= totalCost;
    await userToUpdate.save();

    // 5. Create the transaction record
    const transaction = await Transaction.create({
      user: user._id,
      product: productId,
      type: "buy",
      units: units,
      pricePerUnit: product.price,
    });

    // 6. Send a success response
    res.status(201).json({
      message: "Purchase successful!",
      transaction,
      newBalance: userToUpdate.walletBalance,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id })
      .populate("product", "name category") // Also fetch product name and category
      .sort({ createdAt: -1 }); // Show newest transactions first

    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

module.exports = router;
