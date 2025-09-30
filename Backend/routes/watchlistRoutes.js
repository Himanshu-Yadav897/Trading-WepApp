// routes/watchlistRoutes.js

const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const User = require('../models/user');

const router = express.Router();

// @route   GET api/watchlist
// @desc    Get the user's watchlist
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    // .populate() will replace the product IDs with the actual product data
    const user = await User.findById(req.user._id).populate('watchlist');
    res.status(200).json(user.watchlist);
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// @route   POST api/watchlist
// @desc    Add a product to the user's watchlist
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);

    // Use $addToSet to prevent duplicate entries
    await user.updateOne({ $addToSet: { watchlist: productId } });
    
    res.status(200).json({ message: 'Product added to watchlist.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// @route   DELETE api/watchlist/:productId
// @desc    Remove a product from the user's watchlist
// @access  Private
router.delete('/:productId', protect, async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user._id);

    // Use $pull to remove the item from the array
    await user.updateOne({ $pull: { watchlist: productId } });

    res.status(200).json({ message: 'Product removed from watchlist.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

module.exports = router;