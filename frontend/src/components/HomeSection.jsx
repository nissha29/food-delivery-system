import React from 'react'
import { Clock, MapPin } from 'lucide-react'
import DeliveryGuy from '../assets/DeliveryGuy.png'

function HomeSection() {
  return (
    <div>
        <div className="bg-white pt-20">
        <div className="max-w-7xl mx-auto px-4 pt-16 pb-5">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 space-y-8">
              <h1 className="text-5xl font-bold text-[#1E1B4B] leading-tight">
                Order Your Best 
                <span className="text-[#FFB800] block">Food Anytime.</span>
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                Experience the art of effortless dining with every order. From sizzling local favorites 
                to international cuisines, we bring the city's finest flavors directly to your doorstep.
              </p>
              
              <div className="flex space-x-4">
                <button className="bg-[#FFB800] text-white px-8 py-4 rounded-lg hover:bg-[#e6a600] transition-transform hover:-translate-y-1">
                  Order Now
                </button>
              </div>

              <div className="flex items-center space-x-8 pt-8">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-[#FFB800]" />
                  <span className="text-gray-600">Fast Delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-[#FFB800]" />
                  <span className="text-gray-600">Order Tracking</span>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 mt-12 md:mt-0 hidden md:block">
              <img 
                src={DeliveryGuy} 
                alt="Food Delivery" 
                className="w-full h-[27rem] rounded-2xl transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeSection