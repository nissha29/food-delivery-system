import React from 'react'
import { Pencil, Trash2 } from 'lucide-react';

function ShowMenuItems({ menuItems, handleEdit, handleDelete, handleItemClick }) {
  return (
    <div>
        <div className="hidden md:block cursor-pointer">
            <table className="w-full">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-thin">Image</th>
                  <th className="px-4 py-3 text-left font-thin">Name</th>
                  <th className="px-4 py-3 text-left font-thin">Category</th>
                  <th className="px-4 py-3 text-left font-thin">Price</th>
                  <th className="px-4 py-3 text-left font-thin">Availability</th>
                  <th className="px-4 py-3 text-center font-thin">Actions</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map((item) => (
                  <tr key={item._id} className="border-b hover:bg-gray-50" onClick={() => handleItemClick(item)}>
                    <td className="px-4 py-3">
                      <img 
                        src={item.imageUrl || '/placeholder.jpg'} 
                        alt={item.name} 
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{item.category}</td>
                    <td className="px-4 py-3">${item.price}</td>
                    <td className="px-4 py-3">{item.availability}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(item)
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item._id)
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    </div>
  )
}

export default ShowMenuItems