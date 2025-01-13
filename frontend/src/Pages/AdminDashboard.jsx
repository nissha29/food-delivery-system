import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Menu, X } from 'lucide-react';
import axios from 'axios';
import URL from '../../constant.js';
import ShowMenuItems from '../components/ShowMenuItems.jsx';
import ShowMenuItemsOnSmallScreen from '../components/ShowMenuItemsOnSmallScreen.jsx';
import PreviewModal from '../components/PreviewModal.jsx';
import AddEditModal from '../components/AddEditModal.jsx';

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

  const getMenuItems = async()=>{
    const response = await axios.get(
      `${URL}/api/menu`,
      {
        withCredentials: true,
      }
    )
    setMenuItems(response.data.menuItems);
  }

  useEffect(()=>{
    getMenuItems();
  }, [])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
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
    try{
      const response = await axios.post(
        `${URL}/api/menu`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      getMenuItems();
      setFormData({ name: '', price: '', category: '', availability: '', image: null });
      setImagePreview(null);
      setIsAddModalOpen(false);
    }catch(err){
      console.error('Error updating menu item:', err);
    }
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
        updatedData.image = formData.image;
      }
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
        getMenuItems();
        setFormData({ name: '', price: '', category: '', availability: '', image: null });
        setImagePreview(null);
        setEditingItem(null);
        setIsAddModalOpen(false);
      }
    } catch (err) {
      console.error('Error updating menu item:', err);
    }
  };

  const handleDelete = async(id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try{
        const response = await axios.delete(
          `${URL}/api/menu/${id}`,
          {
            withCredentials: true,
          }
        )
        getMenuItems();
      }catch(err){
        console.error('Error deleting menu item:', err);
      }
    }
  };

  const handleItemClick = (item) => {
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
          <ShowMenuItems menuItems={menuItems} handleEdit={handleEdit} handleDelete={handleDelete} handleItemClick={handleItemClick}/>
          <ShowMenuItemsOnSmallScreen menuItems={menuItems} handleEdit={handleEdit} handleDelete={handleDelete} handleItemClick={handleItemClick} />
        </div>

        <PreviewModal selectedItem={selectedItem} setSelectedItem={setSelectedItem} handleEdit={handleEdit} handleDeletete={handleDelete} />
        
        <AddEditModal handleUpdate={handleUpdate} handleAdd={handleAdd} isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} formData={formData} setFormData={setFormData} imagePreview={imagePreview} setImagePreview={setImagePreview} handleInputChange={handleInputChange} handleImageChange={handleImageChange} editingItem={editingItem} setEditingItem={setEditingItem} />
      </div>
    </div>
  );
};

export default AdminDashboard;