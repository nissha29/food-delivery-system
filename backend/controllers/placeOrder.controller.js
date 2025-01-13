import Order from '../models/order.model.js';
import MenuItem from '../models/menuItem.model.js';
import getTotalAmount  from '../utils/getTotalAmount.util.js';
export default async function (req, res) {
    try {
        const { items } = req.body;
        if(items.length === 0) {
            return res.status(200).json({
                message: 'No items in the order'
            });
        }   
        if (!items || !Array.isArray(items)) {
            return res.status(400).json({
                message: 'Invalid request body. Items array is required.'
            });
        }

        const menuItemIds = items.map(item => item.menuItem._id || item.menuItem);
        const menuItems = await MenuItem.find({ _id: { $in: menuItemIds } });

        if (menuItems.length !== menuItemIds.length) {
            return res.status(400).json({
                message: 'One or more menu items not found'
            });
        }

        const cartItems = menuItems.map(menuItem => {
            const orderItem = items.find(item => 
                (item.menuItem._id || item.menuItem) === menuItem._id.toString()
            );
            return {
                ...menuItem.toObject(), 
                quantity: orderItem.quantity
            };
        });

        const totalAmount = getTotalAmount(items, menuItems);

        const order = new Order({
            userId: req.userId,
            items,
            totalAmount,
        });
        await order.save();
        return res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            menuItems: cartItems,
            totalAmount,
        });
    } catch (err) {
        return res.status(400).json({
            message: 'Error creating order',
            error: err.message
        });
    }
}