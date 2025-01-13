import MenuItem from '../models/menuItem.model.js';
import mongoose from 'mongoose';
export default async function (req, res) {
    try {
      if(req.role === 'user'){
        return res.status(400).json({
          success: false,
          message: `Access denied, only administrators can perform this action`,
        });
      }
  
      const { id } = req.params;
      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
          success: false,
          message: 'Invalid Object id'
        });
      }
  
      const { name, category, price, availability } = req.body;
      console.log("hello")
      console.log(req.body);
      const updateData = {
        name,
        category,
        price,
        availability
      };
  
      if(req.file) {
        updateData.imageUrl = `${process.env.DOMAIN}/uploads/images/${req.file.filename}`;
      }
  
      const menuItem = await MenuItem.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );
  
      if (!menuItem){
        return res.status(404).json({
          success: false,
          message: 'Menu item not found'
        });
      }
  
      return res.status(200).json({
        success: true,
        message: 'Menu item updated successfully',
        menuItem
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Error updating menu item',
        error: err.message
      });
    }
  }