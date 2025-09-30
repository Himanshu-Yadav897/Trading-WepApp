import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Dummy data for the chart
const chartData = [
  { name: 'Jan', price: 4000 }, { name: 'Feb', price: 3000 },
  { name: 'Mar', price: 5000 }, { name: 'Apr', price: 4500 },
  { name: 'May', price: 6000 }, { name: 'Jun', price: 5500 },
];

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${productId}`);
        setProduct(res.data);
      } catch (err) {
        setError('Failed to fetch product details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleBuy = async () => {
    const units = window.prompt('How many units would you like to buy?');
    if (!units || isNaN(units) || Number(units) <= 0) {
      if (units) toast.error('Please enter a valid number of units.');
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/transactions/buy`, { productId, units: Number(units) });
      toast.success('Purchase successful!');
      navigate('/dashboard'); 
    } catch (err) {
      toast.error(err.response.data.message || 'Purchase failed.');
    }
  };

  const handleAddToWatchlist = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/watchlist`, { productId });
      toast.success('Added to watchlist!');
    } catch (err) {
      toast.error(err.response.data.message || 'Failed to add to watchlist.');
    }
  };

  if (loading) return <div className="text-center mt-10">Loading product...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!product) return <div className="text-center mt-10">Product not found.</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">{product.name}</h1>
          <p className="text-lg text-slate-500">{product.category}</p>
        </div>
        <div className="flex space-x-4">
          <button onClick={handleAddToWatchlist} className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition font-medium">
            Add to Watchlist
          </button>
          <button onClick={handleBuy} className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition font-medium">
            Buy Now
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Key Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-slate-500">Current Price</span>
              <span className="text-2xl font-bold text-slate-800">₹{product.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-slate-500">{product.keyMetric.name}</span>
              <span className="font-medium text-slate-700">{product.keyMetric.value}</span>
            </div>
            <div>
              <p className="text-slate-600 mt-4">{product.details}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Price History (Demo)</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
              <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;