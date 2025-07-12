import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem('token'); // ✅ Check login status

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-violet-700 tracking-wide">
          ReWear
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-violet-600 transition">Home</Link>
          <Link to="#" className="hover:text-violet-600 transition">Browse</Link>

          {isLoggedIn ? (
            <Link to="/dashboard" className="hover:text-violet-600 transition">Dashboard</Link>
          ) : (
            <Link to="/login" className="hover:text-violet-600 transition">Login</Link>
          )}

          <Link to="/add-item" className="hover:text-violet-600 transition">List an Item</Link>

          <Link
            to={isLoggedIn ? "/dashboard" : "/register"}
            className="ml-4 px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-500 text-white font-semibold hover:opacity-90 transition"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
