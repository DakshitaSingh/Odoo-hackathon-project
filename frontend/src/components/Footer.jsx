// Footer.jsx
import React from 'react';

const Footer = () => (
  <footer className="bg-white mt-12 py-12 text-sm text-gray-600">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 className="text-lg font-semibold text-purple-700 mb-4">ReWear</h3>
        <p className="text-gray-500 text-sm">
          ReWear is a sustainable fashion platform that helps you swap or redeem pre-loved clothes and reduce textile waste.
        </p>
      </div>

      <div>
        <h4 className="text-md font-semibold mb-3">Company</h4>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-purple-700">About Us</a></li>
          <li><a href="#" className="hover:text-purple-700">Careers</a></li>
          <li><a href="#" className="hover:text-purple-700">Blog</a></li>
          <li><a href="#" className="hover:text-purple-700">Press</a></li>
        </ul>
      </div>

      <div>
        <h4 className="text-md font-semibold mb-3">Support</h4>
        <ul className="space-y-2">
          <li><a href="#" className="hover:text-purple-700">Help Center</a></li>
          <li><a href="#" className="hover:text-purple-700">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-purple-700">Terms & Conditions</a></li>
          <li><a href="#" className="hover:text-purple-700">Report a Problem</a></li>
        </ul>
      </div>

      <div>
        <h4 className="text-md font-semibold mb-3">Follow Us</h4>
        <div className="flex gap-4 text-purple-700">
          <a href="#" className="hover:text-purple-500">Instagram</a>
          <a href="#" className="hover:text-purple-500">Twitter</a>
          <a href="#" className="hover:text-purple-500">LinkedIn</a>
        </div>
        <div className="mt-6">
          <h5 className="text-sm font-medium mb-2">Subscribe to our newsletter</h5>
          <form className="flex">
            <input type="email" placeholder="Enter your email" className="w-full px-3 py-2 border rounded-l-md text-sm outline-none" />
            <button className="bg-purple-600 text-white px-4 rounded-r-md">Subscribe</button>
          </form>
        </div>
      </div>
    </div>

    <div className="border-t mt-10 pt-4 text-center text-xs text-gray-400">
      <p>© {new Date().getFullYear()} ReWear. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;