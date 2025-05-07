import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-center md:text-left">
              © {currentYear} ZezoClinic. All rights reserved.
            </p>
          </div>
          <div className="flex items-center">
            <span>Made with</span>
            <Heart className="h-4 w-4 mx-1 text-red-500" />
            <span>by</span>
            <a 
              href="https://yourzezoweb.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-1 text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              Zezo
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;