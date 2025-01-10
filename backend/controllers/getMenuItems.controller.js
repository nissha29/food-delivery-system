import MenuItem from '../models/menuItem.model.js';
export default async function(req, res){
    try {
      const menuItems = await MenuItem.find({});
      return res.status(200).json({
        success: true,
        message: 'Menu items fetched successfully',
        menuItems
      });
    } catch (err) {
      return res.status(500).json({ 
        message: 'Error fetching menu items', 
        error: err.message 
      });
    }
  }