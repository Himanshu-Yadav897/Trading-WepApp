// models/userModel.js

const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name."], // [value, errorMessage]
    },
    email: {
      type: String,
      required: [true, "Please provide an email address."],
      unique: true,
      lowercase: true, // Convert email to lowercase before saving
      validate: [validator.isEmail, "Please provide a valid email address."],
    },
    password: {
      type: String,
      required: [true, "Please provide a password."],
      minlength: [8, "Password must be at least 8 characters long."],
    },
    panNumber: {
      type: String,
      required: [true, "Please provide your PAN number."],
    },
    idImagePath: {
      type: String,
      required: [true, "Please provide the path to your ID image."],
    },
    walletBalance: {
      type: Number,
      default: 100000,
    },
    watchlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Each item in the array is a link to a Product
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = function () {
  return jwt.sign(
    { id: this._id }, // Payload: the user's unique ID
    process.env.JWT_SECRET, // Use the secret from your .env file
    { expiresIn: "30d" } // Options: token expires in 30 days
  );
};

// Method to compare entered password with hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
