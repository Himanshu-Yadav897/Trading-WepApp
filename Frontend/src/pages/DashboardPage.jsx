import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import ProductList from "../components/ProductList";
import Watchlist from "../components/Watchlist";
import TransactionHistory from "../components/TransactionHistory";

const DashboardPage = () => {
  const { user, refetchUser } = useAuth();
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const [productsRes, transactionsRes, watchlistRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/products`),
        axios.get(`${import.meta.env.VITE_API_URL}/api/transactions`),
        axios.get(`${import.meta.env.VITE_API_URL}/api/watchlist`),
      ]);
      setProducts(productsRes.data);
      setTransactions(transactionsRes.data);
      setWatchlist(watchlistRes.data);
      await refetchUser();
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [refetchUser]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  //  Portfolio Calculations 
  const totalInvested = transactions.reduce(
    (acc, t) => acc + t.pricePerUnit * t.units,
    0
  );
  const currentValue = transactions.reduce((acc, t) => {
    const currentProduct = products.find((p) => p._id === t.product?._id);
    const currentPrice = currentProduct ? currentProduct.price : t.pricePerUnit;
    return acc + currentPrice * t.units;
  }, 0);
  const totalReturns = currentValue - totalInvested;

  if (loading)
    return <div className="text-center mt-10">Loading dashboard...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-slate-500 font-medium">💰 Total Invested</h3>
          <p className="text-3xl font-bold text-slate-800 mt-1">
            ₹{totalInvested.toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-slate-500 font-medium">📈 Current Value</h3>
          <p className="text-3xl font-bold text-slate-800 mt-1">
            ₹{currentValue.toFixed(2)}
          </p>
        </div>
        <div
          className={`bg-white p-6 rounded-xl shadow-lg ${
            totalReturns >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          <h3 className="text-slate-500 font-medium">💸 Total Returns</h3>
          <p className="text-3xl font-bold mt-1">₹{totalReturns.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-slate-500 font-medium">🏦 Remaining Balance</h3>
          <p className="text-3xl font-bold text-slate-800 mt-1">
            ₹{user?.walletBalance.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ProductList products={products} refreshData={fetchData} />
        </div>
        <div>
          <Watchlist watchlist={watchlist} refreshData={fetchData} />
        </div>
      </div>

      <TransactionHistory transactions={transactions} />
    </div>
  );
};

export default DashboardPage;
