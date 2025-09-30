import React from 'react';
import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white">

      <div className="text-center py-24 px-6 bg-slate-50">
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800">
          Welcome to <span className="text-purple-600">EnxtAI Finance</span>
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          Your personal platform for tracking investments, managing your portfolio, and discovering new opportunities in the market.
        </p>
        <div className="mt-8">
          {user ? (
            <Link
              to="/dashboard"
              className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 transition duration-300 text-lg"
            >
              Go to Your Dashboard
            </Link>
          ) : (
            <Link
              to="/register"
              className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 transition duration-300 text-lg"
            >
              Get Started for Free
            </Link>
          )}
        </div>
      </div>

      
      <div className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-800 mb-12">
            Features Designed for You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-slate-50 p-8 rounded-xl shadow-md text-center">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Portfolio Tracking</h3>
              <p className="text-slate-600">
                Instantly see your total investment, current value, and returns in a clear, concise dashboard.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-slate-50 p-8 rounded-xl shadow-md text-center">
              <div className="text-4xl mb-4">🛒</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Seamless Trading</h3>
              <p className="text-slate-600">
                Buy from a curated list of investment products directly from your virtual wallet.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-slate-50 p-8 rounded-xl shadow-md text-center">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Personal Watchlist</h3>
              <p className="text-slate-600">
                Keep an eye on products you're interested in by adding them to your personal watchlist.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;