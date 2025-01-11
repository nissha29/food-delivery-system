import MenuItem from '../models/menuItem.model.js';
import { z } from 'zod';

const menuItemSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be 100 characters or less"),
  category: z.string().min(1, "Category is required"),
  price: z.number().positive("Price must be a positive number"),
  imageUrl: z.object({
      fieldname: z.string(),
      originalname: z.string(),
      mimetype: z.string().refine(val => {
          return ['image/jpeg', 'image/png', 'image/webp'].includes(val);
      }, "Only .jpg, .png and .webp formats are allowed"),
      size: z.number().refine(val => val <= 5 * 1024 * 1024, "Image size must be less than 5MB")
  }).required("Image is required")
});

export default async function(req, res){
  try {
    if(req.role === 'user'){
      return res.status(400).json({
        success: false,
        message: `Access denied, only administrators can perform this action`,
      })
    }
    if(!req.file){
      return res.status(400).json({
          success: false,
          message: `Menu item image is required`
      })
    }
    const validatedData = menuItemSchema.safeParse({
      ...req.body,
      price: Number(req.body.price),
      imageUrl: req.file 
    });

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
      price,
      imageUrl: `${process.env.DOMAIN}/uploads/images/${req.file.filename}`
    });

    await menuItem.save();
    res.status(201).json({
      success: true,
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