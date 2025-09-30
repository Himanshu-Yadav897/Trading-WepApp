// models/transactionModel.js

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This creates a reference to the User model
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // This creates a reference to the Product model
    required: true,
  },
  type: {
    type: String,
    enum: ['buy'], // For now, we only have 'buy' transactions
    required: true,
  },
  units: {
    type: Number,
    required: [true, 'Transaction must include the number of units.'],
  },
  pricePerUnit: {
    type: Number,
    required: [true, 'Transaction must include the price per unit at the time of purchase.'],
  },
}, {
  timestamps: true,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;