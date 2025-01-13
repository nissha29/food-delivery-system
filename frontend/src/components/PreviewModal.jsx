import React from 'react'
import { Pencil, Trash2, X } from 'lucide-react';

function PreviewModal({ selectedItem, setSelectedItem, handleEdit, handleDelete}) {
  if(!selectedItem) return null;
  return (
    <div>
        {selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-secondary">Item Details</h2>
                  <button 
                    onClick={() => setSelectedItem(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <img 
                    src={selectedItem.imageUrl || '/placeholder.jpg'} 
                    alt={selectedItem.name}
                    className="w-full h-48 object-fill rounded-lg"
                  />
                  
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm text-gray-600">Name</label>
                      <p className="font-semibold text-lg">{selectedItem.name}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-600">Category</label>
                      <p className="font-medium">{selectedItem.category}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-600">Price</label>
                      <p className="font-medium">${selectedItem.price}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-600">Availability</label>
                      <p className="font-medium">{selectedItem.availability}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6 pt-4 border-t">
                    <button
                      onClick={() => {
                        setSelectedItem(null);
                        handleEdit(selectedItem);
                      }}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={18} />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(selectedItem?._id);
                        setSelectedItem(null);
                      }}
                      className="flex items-center gap-2 text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default PreviewModal