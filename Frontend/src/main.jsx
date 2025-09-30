// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';

// Import Layout and Pages
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import { AuthProvider } from './context/AuthContext';
import ProductDetailPage from './pages/ProductDetailPage';

// Define the router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // The Layout component is the root UI shell
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/product/:productId', element: <ProductDetailPage /> },
    ],
  },
]);

// Provide the router to the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> 
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>

);