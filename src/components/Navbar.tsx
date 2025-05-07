import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-teal-500 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Stethoscope className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-bold text-white">ZezoClinic</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-white hover:text-blue-100 px-3 py-2 rounded-md transition-colors duration-200">
              Home
            </Link>
            <Link to="/records" className="text-white hover:text-blue-100 px-3 py-2 rounded-md transition-colors duration-200">
              Records
            </Link>
            <a href="https://yourzezoweb.com" target="_blank" rel="noopener noreferrer" 
              className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md font-medium transition-colors duration-200">
              Your Web
            </a>
          </div>
          
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white hover:text-blue-100 focus:outline-none">
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" onClick={toggleMenu} className="text-white hover:text-blue-100 block px-3 py-2 rounded-md">
                Home
              </Link>
              <Link to="/records" onClick={toggleMenu} className="text-white hover:text-blue-100 block px-3 py-2 rounded-md">
                Records
              </Link>
              <a href="https://yourzezoweb.com" target="_blank" rel="noopener noreferrer" 
                className="bg-white text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md font-medium">
                Your Web
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;