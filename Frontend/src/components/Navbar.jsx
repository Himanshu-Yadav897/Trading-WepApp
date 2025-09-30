import React from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logoutAction } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAction();
    navigate('/');
  };

  const authLinks = (
    <div className="flex items-center space-x-6">
      <span className="text-slate-600">Hello, {user?.name}</span>
      <Link to="/dashboard" className="text-slate-600 hover:text-purple-600 font-medium">
        Dashboard
      </Link>
      <button 
        onClick={handleLogout} 
        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300 font-medium"
      >
        Logout
      </button>
    </div>
  );

  const guestLinks = (
    <div className="flex items-center space-x-6">
      <Link to="/register" className="text-slate-600 hover:text-purple-600 font-medium">
        Register
      </Link>
      <Link to="/login" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300 font-medium">
        Login
      </Link>
    </div>
  );

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-purple-600">
          EnxtAI Finance
        </Link>
        <div>{user ? authLinks : guestLinks}</div>
      </div>
    </nav>
  );
};

export default Navbar;