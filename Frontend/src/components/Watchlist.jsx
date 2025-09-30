import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router';

const Watchlist = ({ watchlist, refreshData }) => {
  const handleRemove = async (productId) => {
    if (window.confirm('Are you sure you want to remove this?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/watchlist/${productId}`);
        toast.success('Removed from watchlist.');
        refreshData();
      } catch (err) {
        toast.error('Failed to remove from watchlist.');
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Your Watchlist</h2>
      <div className="space-y-3">
        {watchlist.length > 0 ? (
          watchlist.map((item) => (
            <div key={item._id} className="flex justify-between items-center p-2 rounded-md hover:bg-slate-50">
              <Link to={`/product/${item._id}`} className="font-semibold text-slate-700 hover:text-purple-600">{item.name}</Link>
              <button onClick={() => handleRemove(item._id)} className="text-red-500 hover:text-red-700 text-sm font-medium">Remove</button>
            </div>
          ))
        ) : (
          <p className="text-slate-500">Your watchlist is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Watchlist;