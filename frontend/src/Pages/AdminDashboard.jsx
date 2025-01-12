import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Menu, X } from 'lucide-react';
import axios from 'axios';
import URL from '../../constant.js';

const AdminDashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    availability: '',
    image: null,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    console.log(e.target)
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file
    });

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = async(e) => {
    e.preventDefault();
    const  response = await axios.post(
      `${URL}/api/menu`,
      formData,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    const newItem = response.data.menuItem;
    setMenuItems([...menuItems, newItem]);
    setFormData({ name: '', price: '', category: '', availability: '', image: null });
    setImagePreview(null);
    setIsAddModalOpen(false);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      price: item.price,
      category: item.category,
      availability: item.availability,
      image: null
    });
    setImagePreview(item.imageUrl);
    setIsAddModalOpen(true);
  };

  const handleUpdate = async(e) => {
    e.preventDefault();
    
    try {
      const updatedData = {
        name: formData.name,
        price: formData.price,
        category: formData.category,
        availability: formData.availability,
      }
      
      if (formData.image instanceof File) {
        updatedData.imageUrl = formData.image;
      }

      console.log(updatedData);
      const response = await axios.patch(
        `${URL}/api/menu/${editingItem._id}`,
        updatedData,
        {
          withCredentials: true,                        
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
  
      if (response.data.success) {
        // Update the menuItems state with the updated item
        setMenuItems(prevItems => 
          prevItems.map(item => 
            item._id === editingItem._id ? response.data.menuItem : item
          )
        );
  
        // Reset form and close modal
        setFormData({ name: '', price: '', category: '', availability: '', image: null });
        setImagePreview(null);
        setEditingItem(null);
        setIsAddModalOpen(false);
      }
    } catch (error) {
      console.error('Error updating menu item:', error);
      alert(error.response?.data?.message || 'Error updating menu item');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setMenuItems(menuItems.filter(item => item.id !== id));
    }
  };

  const handleMobileItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-merriweather">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-secondary">Menu Management</h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors w-full sm:w-auto justify-center"
          >
            <Plus size={20} />
            Add New Item
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="hidden md:block">
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
                  <tr key={item.id} className="border-b hover:bg-gray-50">
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
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
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

          <div className="md:hidden">
            {menuItems.map((item) => (
              <div 
                key={item.id} 
                className="p-4 border-b last:border-b-0 cursor-pointer"
                onClick={() => handleMobileItemClick(item)}
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
                        handleDelete(item.id);
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

        {/* Mobile Preview Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 md:hidden">
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
                    className="w-full h-48 object-cover rounded-lg"
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
                        handleDelete(selectedItem.id);
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

        {/* Add/Edit Modal */}
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
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
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
    </div>
  );
};

export default AdminDashboard;