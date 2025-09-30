// src/components/Layout.jsx

import React from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="bg-slate-100 min-h-screen">
      <Toaster position="top-center" reverseOrder={false} /> <Navbar />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
