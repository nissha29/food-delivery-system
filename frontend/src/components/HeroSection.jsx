import React from 'react';
import CustomerReviews from './CustomerReviews';
import deliveryGuy from '../assets/DeliveryGuy.png'

const HeroSection = () => {
  return (
    <div className="w-full min-h-screen lg:px-16 sm:px-6 px-4 py-8 sm:py-12 lg:py-16 mt-24 font-merriweather">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-secondary leading-tight">
              Order Your Best
              <br />
              Food Anytime.
            </h1>
            
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-xl">
              Experience the art of effortless dining with every order. From sizzling local favorites 
              to international cuisines, we bring the city's finest flavors directly to your doorstep. 
              Join thousands of satisfied food lovers who've made mealtime stress-free.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="w-full sm:w-auto bg-primary text-white px-6 py-3 rounded-md hover:bg-yellow-500 transition-colors duration-300 flex items-center justify-center">
                Order Now
                <svg 
                  className="w-4 h-4 ml-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </button>
              
              <button className="w-full sm:w-auto text-gray-700 hover:text-primary transition-colors duration-300 flex items-center justify-center">
                <span className="mr-2">Watch Video</span>
                <svg 
                  className="w-6 h-6" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </button>
            </div>
            
            <div className="pt-6">
              <CustomerReviews />
            </div>
          </div>
          
          {/* Right Content - Image */}
          <div className="w-full lg:w-1/2 pt-6">
            <img
              src={deliveryGuy}
              alt="Delivery Guy"
              className="w-full lg:h-[35rem] h-[25rem] md:h-[35rem] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};


export default HeroSection;