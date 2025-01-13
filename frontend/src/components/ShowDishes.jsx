import React from 'react'
import { Minus, Plus, ShoppingBag } from 'lucide-react';

function ShowDishes({ filteredDishes, updateQuantity}) {
  return (
    <div>
      <div className="max-w-8xl mx-auto 2xl:px-28 xl:px-4 px-4 py-12">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
        {filteredDishes.map((dish) => (
          <div
            key={dish._id}
            className={`bg-white rounded-md shadow-lg overflow-hidden hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300 ${dish.availability === 'Out of Stock' ? 'opacity-50' : ''}`}
          >
            <div className="relative">
              <img
                src={dish.imageUrl}
                alt={dish.name}
                className="w-full h-48 object-fill"
              />
              {(dish.availability === 'Out of Stock') && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg">
                  Out of Stock
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#1E1B4B]">{dish.name}</h3>
                  <p className="text-gray-500 text-sm">{dish.category}</p>
                </div>
                <span className="text-lg font-bold text-[#1E1B4B]">${dish.price}</span>
              </div>

              <div className="flex items-center justify-between mt-4">
                {(dish.availability === 'In Stock') ? (
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => updateQuantity(dish._id, -1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                      disabled={dish.quantity === 0}
                    >
                      <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="w-8 text-center font-medium">{(dish.quantity === 0 ? '0' : dish.quantity)}</span>
                    <button
                      onClick={() => updateQuantity(dish._id, 1)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                ) : (
                  <div className="text-gray-500 text-sm">Currently Unavailable</div>
                )}
                {(dish.availability === 'In Stock') && (
                  <button
                    onClick={() => {
                        updateQuantity(dish._id, 0)
                      }
                    }
                    className={`bg-[#FFB800] text-white px-4 py-2 rounded-lg hover:bg-[#e6a600] transition-colors flex items-center space-x-2 ${
                      !dish.availability && 'opacity-50 cursor-not-allowed'
                    }`}
                    disabled={(dish.availability === 'Out of Stock')}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
     </div>
    </div>
  )
}

export default ShowDishes