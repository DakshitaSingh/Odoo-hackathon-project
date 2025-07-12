// src/pages/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="flex items-center justify-between px-8 py-4 shadow-md bg-white">
      <div className="text-2xl font-bold text-violet-700">ReWear</div>
      <nav className="flex space-x-6 text-gray-700">
        <Link to="/" className="hover:text-violet-600">Home</Link>
        <Link to="#" className="hover:text-violet-600">Browse</Link>
        <Link to="/login" className="hover:text-violet-600">Login</Link>
        <Link to="/add-item" className="hover:text-violet-600">List an Item</Link>
        <Link
          to="#"
          className="px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-500 text-white font-semibold hover:opacity-90"
        >
          Get Started
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
