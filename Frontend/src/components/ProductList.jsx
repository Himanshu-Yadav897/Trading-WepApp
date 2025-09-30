import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import toast from 'react-hot-toast';

const ProductList = ({ products, refreshData }) => {
  const handleBuy = async (productId) => {
    const units = window.prompt('How many units would you like to buy?');
    if (!units || isNaN(units) || Number(units) <= 0) {
      if (units) toast.error('Please enter a valid number of units.');
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/transactions/buy`, { productId, units: Number(units) });
      toast.success('Purchase successful!');
      refreshData();
    } catch (err) {
      toast.error(err.response.data.message || 'Purchase failed.');
    }
  };

  const handleAddToWatchlist = async (productId) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/watchlist`, { productId });
      toast.success('Added to watchlist!');
      refreshData();
    } catch (err) {
      toast.error(err.response.data.message || 'Failed to add to watchlist.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Investment Products</h2>
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-4 rounded-lg shadow-md grid grid-cols-3 items-center gap-4">
            <div className="col-span-2 md:col-span-1">
              <Link to={`/product/${product._id}`} className="font-semibold text-lg text-purple-600 hover:underline">
                {product.name}
              </Link>
              <p className="text-sm text-slate-500">{product.category}</p>
            </div>
            <div className="hidden md:block text-center">
              <p className="font-semibold text-lg text-slate-800">₹{product.price.toFixed(2)}</p>
            </div>
            <div className="col-span-1 text-right space-x-2">
              <button onClick={() => handleAddToWatchlist(product._id)} className="border border-purple-600 text-purple-600 px-3 py-1 rounded-md hover:bg-purple-50 transition text-sm font-medium">
                Watch
              </button>
              <button onClick={() => handleBuy(product._id)} className="bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700 transition text-sm font-medium">
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;