import MenuItem from '../models/menuItem.model.js';
export default async function (req, res) {
    try {
        const { id } = req.params;
        const { name, category, price, availability } = req.body;
        const menuItem = await MenuItem.findByIdAndUpdate(id, {
            name,
            category,
            price,
            availability
        },
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