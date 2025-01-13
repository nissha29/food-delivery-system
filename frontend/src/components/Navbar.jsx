import React, { useState } from 'react';
import Login from './Login';
import { ShoppingBag } from 'lucide-react'
import { NavLink } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full px-3 py-3 sm:py-4 font-merriweather bg-white shadow-sm fixed top-0 z-50">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex justify-between items-center">
      
        <div className="flex items-center space-x-2">
              <ShoppingBag className="w-8 h-8 text-[#FFB800]" />
              <span className="text-2xl font-bold text-[#1E1B4B]">FoodieExpress</span>
        </div>

      
          <div className="hidden md:flex items-center space-x-3 lg:space-x-8">
            <NavLink to={'/home'}>Home</NavLink>
            <NavLink href="#">Service</NavLink>
            <NavLink href="#">About Us</NavLink>
            <NavLink href="#">Contact Us</NavLink>
            <button onClick={()=>{
              setIsOpen(prev => !prev)
            }} className="bg-primary text-white px-4 lg:px-6 py-2 rounded-md hover:bg-yellow-500 transition-colors duration-200 text-base sm:text-lg">
              Log In
            </button>
          </div>

      
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 p-2"
              aria-label="Toggle menu"
            >
              <svg 
                className="w-10 h-10 sm:w-8 sm:h-8" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                />
              </svg>
            </button>
          </div>
        </div>

      
        <div 
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? "max-h-64 opacity-100 mt-4" 
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="flex flex-col space-y-4 px-2 pb-4">
            <NavLink to={"/home"}>Home</NavLink>
            <NavLink href="#">Service</NavLink>
            <NavLink href="#">About Us</NavLink>
            <NavLink href="#">Contact Us</NavLink>
            <button onClick={()=>{
              setIsOpen(prev => !prev)
              setIsMenuOpen(prev => !prev)
            }} className="bg-primary text-white px-6 py-2.5 rounded-md hover:bg-yellow-500 w-full transition-colors duration-200 text-base sm:text-lg">
              Log In
            </button>
          </div>
        </div>
      </div>
      {isOpen && <div className='relative'>
        <Login className="absolute top-1/2 left-1/2 right-1/2 bottom-1/2" onClose={()=>{
          setIsOpen(false);
        }}/>
      </div>}
    </nav>
  );
}

export default Navbar;