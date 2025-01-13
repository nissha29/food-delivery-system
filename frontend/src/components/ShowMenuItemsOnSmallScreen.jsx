import React from 'react'
import { Pencil, Trash2 } from 'lucide-react';

function ShowMenuItemsOnSmallScreen({ menuItems, handleEdit, handleDelete, handleItemClick }) {
  return (
    <div>
        <div className="block md:hidden">
            {menuItems.map((item) => (
              <div 
                key={item._id} 
                className="p-4 border-b last:border-b-0 cursor-pointer"
                onClick={() => handleItemClick(item)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex gap-4">
                    <img 
                      src={item.imageUrl || '/placeholder.jpg'} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold text-secondary">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(item);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item._id);
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <p className="text-gray-900 font-medium">${item.price}</p>
                <p className="text-sm text-gray-600 mt-1">{item.availability}</p>
              </div>
            ))}
        </div>
    </div>
  )
}

export default ShowMenuItemsOnSmallScreen