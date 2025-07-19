import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/fastcasino.png'; // Adjust path if needed

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsLoggedIn(true);
      setUserData(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserData(null);
    setMobileMenuOpen(false);
    navigate('/');
    alert('You have been logged out successfully!');
  };

  const navLinks = ['Home', 'About', 'Game', 'Contact'];
  if (isLoggedIn) navLinks.push('Profile');

  return (
    <nav className="bg-gradient-to-r from-[#1f2937] via-[#111827] to-[#1a1f2d] py-4 sticky top-0 z-[1000] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo only (no name) */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="FastCasino" className="h-12 w-auto md:h-16" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((text, i) => (
              <Link
                key={i}
                to={`/${text === 'Home' ? '' : text.toLowerCase().replace(/\s/g, '')}`}
                className="text-white hover:text-yellow-400 transition duration-200 font-medium"
              >
                {text}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex gap-4 items-center">
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300">
                  <FaUser className="text-lg" />
                  <span className="font-medium">{userData?.name || 'Profile'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-1 rounded transition duration-200"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/loginsinup">
                  <button className="bg-transparent border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-4 py-1 rounded transition duration-200">
                    Login
                  </button>
                </Link>
                <Link to="/loginsinup">
                  <button className="bg-yellow-400 text-black hover:bg-yellow-500 px-4 py-1 rounded transition duration-200">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-yellow-400 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-0 right-0 w-64 h-full bg-[#1a1f2d] p-6 z-[1050] shadow-2xl transition duration-300">
          <div className="flex flex-col space-y-6 mt-16">
            {navLinks.map((text, i) => (
              <Link
                key={i}
                to={`/${text === 'Home' ? '' : text.toLowerCase().replace(/\s/g, '')}`}
                className="text-white hover:text-yellow-400 text-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                {text}
              </Link>
            ))}

            <div className="flex flex-col gap-4 mt-8">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-3 text-yellow-400 py-2 border-t border-gray-700">
                    <FaUser />
                    <span className="font-medium">{userData?.name || 'User'}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition duration-200"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/loginsinup" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full bg-transparent border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-4 py-2 rounded transition duration-200">
                      Login
                    </button>
                  </Link>
                  <Link to="/loginsinup" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full bg-yellow-400 text-black hover:bg-yellow-500 px-4 py-2 rounded transition duration-200">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
