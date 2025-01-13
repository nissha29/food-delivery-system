import React from 'react'

function AddEditModal({handleUpdate, handleAdd, isAddModalOpen, setIsAddModalOpen, formData, setFormData, imagePreview, setImagePreview, handleInputChange,handleImageChange, editingItem, setEditingItem}) {
  return (
    <div>
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-6 text-secondary">
                  {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
                </h2>
                <form onSubmit={editingItem ? handleUpdate : handleAdd} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {imagePreview && (
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="mt-2 w-32 h-32 object-cover rounded"
                      />
                    )}
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Popular">Popular</option>
                      <option value="Italian">Italian</option>
                      <option value="Chinese">Chinese</option>
                      <option value="Indian">Indian</option>
                      <option value="Japanese">Japanese</option>
                      <option value="Fast Food">Fast Food</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Price</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Availability</label>
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="">Select availability</option>
                      <option value="In Stock">In Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                      <option value="Coming Soon">Coming Soon</option>
                    </select>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddModalOpen(false);
                        setEditingItem(null);
                        setFormData({ name: '', price: '', category: '', availability: '', image: null });
                        setImagePreview(null);
                      }}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 order-2 sm:order-1"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary text-white rounded hover:bg-yellow-600 transition-colors order-1 sm:order-2"
                    >
                      {editingItem ? 'Update' : 'Add'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default AddEditModal