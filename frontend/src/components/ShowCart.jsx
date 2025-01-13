import React from 'react'
import { X, ShoppingBag } from 'lucide-react';

function ShowCart({ showCart, setShowCart, cart, updateQuantity, removeFromCart, totalAmount }) {
  function placeOrder(){
    alert("Your order is placed successfully!");
  }

  return (
    <div>
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-end transition-opacity">
          <div className="bg-white h-full w-full max-w-md p-6 shadow-xl overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#1E1B4B]">Your Cart</h2>
              <button 
                onClick={() => setShowCart(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            {!cart || cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item._id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img 
                      src={item.imageUrl}
                      alt={item.name} 
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1E1B4B]">{item.name}</h3>
                      <p className="text-gray-500 text-sm">${item.price}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item._id, -1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, 1)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <X className="text-gray-500" size={16}/>
                    </button>
                  </div>
                ))}
                
                <div className="border-t pt-4 space-y-4">
                  <div className="flex justify-between text-lg">
                    <span className="font-medium">Total</span>
                    <span className="font-bold text-[#1E1B4B]">{totalAmount}</span>
                  </div>
                  <button
                    onClick={placeOrder}
                    className="w-full bg-[#FFB800] text-white py-3 rounded-lg hover:bg-[#e6a600] transition-colors font-medium"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowCart