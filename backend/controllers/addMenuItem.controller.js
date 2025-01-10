import MenuItem from '../models/menuItem.model.js';
import { z } from 'zod';

const menuItemSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be 100 characters or less"),
  category: z.string().min(1, "Category is required"),
  price: z.number().positive("Price must be a positive number"),
});

export default async function(req, res){
  try {
    const validatedData = menuItemSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res.status(400).json({
          success: false,
          message: `invalid input format, ${validatedData.error}`
      })
  }

    const { name, category, price } = validatedData.data;
    const menuItem = new MenuItem({ 
      name, 
      category, 
      price 
    });
    await menuItem.save();
    res.status(201).json({
      succcess: true,
      message: 'Menu item created successfully',
      menuItem
    });
  } catch (err) {
      res.status(500).json({ 
        message: 'Error creating menu item', 
        error: err.message 
      });
    }
}