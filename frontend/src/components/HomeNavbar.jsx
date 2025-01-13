import React from 'react'
import { ShoppingBag } from 'lucide-react'

function HomeNavbar({ setShowCart, cart }) {
  return (
    <div>
      <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-8 h-8 text-[#FFB800]" />
              <span className="text-2xl font-bold text-[#1E1B4B]">FoodieExpress</span>
            </div>

            <div className="flex items-center space-x-6">
              <button 
                onClick={() => {
                  setShowCart(true);
                }}
                className="bg-[#FFB800] text-white px-6 py-2 rounded-lg hover:bg-[#e6a600] transition-colors flex items-center space-x-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="font-medium">Cart ({cart.length})</span>
              </button>
            </div>

          </div>
        </div>
      </nav>
    </div>
  )
}

export default HomeNavbar