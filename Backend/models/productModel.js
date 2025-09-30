// models/productModel.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name.'],
    unique: true,
    trim: true, // Removes whitespace from both ends of a string
  },
  category: {
    type: String,
    required: [true, 'A product must have a category (e.g., Stock, Mutual Fund).'],
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price per unit.'],
  },
  keyMetric: {
    name: {
      type: String,
      required: true, // e.g., 'P/E Ratio'
    },
    value: {
      type: String, // Using String to be flexible (e.g., '25.5', 'N/A')
      required: true,
    }
  },
  details: {
    type: String, // For the extra dummy data on the detail page
    default: 'More detailed information about this product will be shown here.',
  },
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;