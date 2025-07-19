import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import logo from '../assets/fastcasino.png'; // ✅ Make sure the path is correct

const Footer = () => {
  return (
    <footer className="bg-[rgba(26,31,45,0.95)] py-8 mt-16 border-t border-[rgba(255,255,255,0.1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* ✅ Logo Only Section */}
          <div>
            <div className="mb-4">
              <img src={logo} alt="Fast Casino Logo" className="h-12" />
            </div>
            <p className="text-gray-300">
              The premier destination for online casino games. Play Dragon Tiger, Teen Patti, Andar Bahar and more!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-400">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-orange-500 transition">Home</a></li>
              <li><a href="/game" className="text-gray-300 hover:text-orange-500 transition">Games</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-orange-500 transition">How to Play</a></li>
              <li><a href="/profile" className="text-gray-300 hover:text-orange-500 transition">My Account</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-orange-500 transition">Support</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-400">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition">Responsible Gaming</a></li>
              <li><a href="#" className="text-gray-300 hover:text-orange-500 transition">Fair Play</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-400">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-blue-500 transition"><FaFacebook size={24} /></a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition"><FaTwitter size={24} /></a>
              <a href="#" className="text-gray-300 hover:text-pink-500 transition"><FaInstagram size={24} /></a>
              <a href="#" className="text-gray-300 hover:text-red-600 transition"><FaYoutube size={24} /></a>
            </div>
          </div>

        </div>

        <div className="mt-8 pt-8 border-t border-[rgba(255,255,255,0.1)] text-center text-gray-500">
          &copy; 2025 Fast Casino. All rights reserved.| BY VKGYANTI.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
