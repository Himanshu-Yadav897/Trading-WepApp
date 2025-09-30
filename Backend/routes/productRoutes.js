const express = require('express');
const Product = require('../models/productModel');

const router = express.Router();

//  DUMMY DATA 
const dummyProducts = [
  {
    name: 'Reliance Industries',
    category: 'Stock',
    price: 2850.75,
    keyMetric: { name: 'P/E Ratio', value: '28.5' },
    details: 'Reliance Industries Limited is an Indian multinational conglomerate company, headquartered in Mumbai.'
  },
  {
    name: 'Tata Motors',
    category: 'Stock',
    price: 975.30,
    keyMetric: { name: 'P/E Ratio', value: '15.2' },
    details: 'Tata Motors Limited is an Indian multinational automotive manufacturing company.'
  },
  {
    name: 'Parag Parikh Flexi Cap Fund',
    category: 'Mutual Fund',
    price: 75.25, // This would be the NAV
    keyMetric: { name: 'Expense Ratio', value: '0.64%' },
    details: 'An open-ended dynamic equity scheme investing across large cap, mid cap, small cap stocks.'
  }
];



// Post API for the inital Product list
router.post('/seed', async (req, res) => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    // Insert the dummy products
    const createdProducts = await Product.insertMany(dummyProducts);
    res.status(201).json(createdProducts);
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});


// GET API for the fetching of all the Products list
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});


// GET API for the fetching of specfic product by it's ID
router.get('/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: 'Product not found.' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Server error: ' + err.message });
    }
  });

module.exports = router;