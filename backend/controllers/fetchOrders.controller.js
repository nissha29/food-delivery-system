import Order from '../models/order.model.js';
export default async function(req, res){
    try {
      const orders = await Order.find({ userId: req.userId }).populate('items.menuItem');
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
  }