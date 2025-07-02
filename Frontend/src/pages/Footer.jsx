import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-8 text-lg">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo and Description */}
        <div>
          <h2 className="text-3xl font-bold mb-4">RideShare</h2>
          <p className="text-base text-gray-400">
            Premium taxi booking service offering comfort, speed, and luxury right at your fingertips.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-3 text-base text-gray-300">
            <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
            <li><Link to="/features" className="hover:text-yellow-400">Features</Link></li>
            <li><Link to="/pricing" className="hover:text-yellow-400">Pricing</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-400">Contact</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Support</h3>
          <ul className="space-y-3 text-base text-gray-300">
            <li><Link to="/faq" className="hover:text-yellow-400">FAQ</Link></li>
            <li><Link to="/help" className="hover:text-yellow-400">Help Center</Link></li>
            <li><Link to="/privacy" className="hover:text-yellow-400">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-yellow-400">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Get in Touch</h3>
          <p className="text-base text-gray-400">Email: support@restfultaxi.com</p>
          <p className="text-base text-gray-400">Phone: +91 98765 43210</p>
          <div className="flex space-x-6 mt-4">
            <a href="https://meta.com/" className="hover:text-yellow-400">Facebook</a>
            <a href="https://twitter.com/" className="hover:text-yellow-400">Twitter</a>
            <a href="https://instagram.com/" className="hover:text-yellow-400">Instagram</a>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-base text-gray-500">
        © {new Date().getFullYear()} RideShare Taxi. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
