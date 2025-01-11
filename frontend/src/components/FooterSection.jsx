import React from 'react';
import { Mail, Instagram, Facebook, Twitter } from 'lucide-react';

function FooterSection() {
  return (
    <footer className="bg-primary w-full py-8 sm:py-12 md:py-16 2xl:mt-[-6.5rem] z-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16 md:gap-32 lg:gap-60 font-merriweather">
          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-medium text-gray-800">FoodieExpress</h3>
            <div className="flex items-center justify-center sm:justify-start space-x-2 mt-1">
              <Facebook className="text-gray-700 hover:text-gray-900 cursor-pointer" size={16} />
              <Instagram className="text-gray-700 hover:text-gray-900 cursor-pointer" size={16} />
              <Twitter className="text-gray-700 hover:text-gray-900 cursor-pointer" size={16} />
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-medium text-gray-800">Links</h3>
            <div className="flex space-x-4 mt-1">
              <a href="#" className="text-gray-700 hover:text-gray-900 text-xs sm:text-sm">About</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 text-xs sm:text-sm">Help</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 text-xs sm:text-sm">Terms</a>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-medium text-gray-800">Contact</h3>
            <div className="flex items-center justify-center sm:justify-start mt-1 space-x-1">
              <Mail className="w-3 h-3 text-gray-700" />
              <span className="text-gray-700 text-xs sm:text-sm">support@foodie.com</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-700 font-merriweather">
          <p className="text-center text-gray-700 text-xs">
            © {new Date().getFullYear()} FoodieExpress
          </p>
        </div>
      </div>
    </footer>
  );
}
export default FooterSection;