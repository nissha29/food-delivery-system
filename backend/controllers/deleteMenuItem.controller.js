import MenuItem from '../models/menuItem.model.js';
export default async function(req, res){
    try {
      const { id } = req.params;
      const menuItem = await MenuItem.findByIdAndDelete(id);
      if (!menuItem){
        return res.status(404).json({ 
            success: false,
            message: 'Menu item not found' 
        });
      } 
      return res.status(200).json({ 
        success: true,
        message: 'Menu item deleted successfully' 
    });
    } catch (err) {
      res.status(500).json({ 
        message: 'Error deleting menu item', 
        error: err.message 
    });
    }
  }