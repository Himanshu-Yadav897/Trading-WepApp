// routes/userRoutes.js

const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const {protect} = require("../middlewares/authMiddleware");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password, panNumber } = req.body;

    // 1. Basic Validation & Check for existing user
    if (!name || !email || !password || !panNumber) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    // 2. Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    // For now, we use a dummy path for the ID image
    const idImagePath = "/uploads/dummy-id.jpg";

    // 3. Create a new user instance
    const user = new User({
      name,
      email,
      password: passwordHash,
      panNumber,
      idImagePath,
    });

    // 4. Save the user and get the token
    const savedUser = await user.save();
    const token = savedUser.getJWT(); // Calling our new method!

    // 5. Send the response
    res.status(201).json({
      message: "User registered successfully!",
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

// login API
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Basic validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide both email and password." });
    }

    // 2. Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      // Use a generic message for security
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // 3. Compare passwords using our model method
    const isPasswordValid = await user.comparePassword(password);

    if (isPasswordValid) {
      // 4. If password is valid, get the token
      const token = user.getJWT();

      // 5. Send the response
      res.status(200).json({
        message: "Logged in successfully!",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } else {
      // Use a generic message for security
      res.status(401).json({ message: "Invalid credentials." });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

// --- END OF LOGIN ROUTE ---

// @route   GET api/users/profile
// @desc    Get logged in user's profile
// @access  Private
userRouter.get("/profile", protect, (req, res) => {
  // Because the 'protect' middleware ran successfully,
  // we have the user object attached to the request (req.user)
  res.status(200).json(req.user);
});

module.exports = userRouter;
