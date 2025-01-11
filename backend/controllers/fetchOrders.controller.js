import Order from '../models/order.model.js';
export default async function(req, res){
    try {
      const orders = await Order
      .find({ 
        userId: req.userId 
      })
      .populate('items.menuItem');
      if(orders.length === 0){
        return res.status(200).json({
          success: true,
          message: `No order history`
        })
      }
      return res.status(200).json({
        success: true,
        message: `Succesfully fetched youe order history`,
        orders: orders,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
  }