import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        enum: ['Popular', 'Italian', 'Chinese', 'Indian', 'Japanese', 'Fast Food'],
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    availability: { 
        type: String,
        enum: ['In Stock', 'Out of Stock', 'Coming Soon'],
        default: 'In Stock'
    },
    imageUrl: {
        type: String,
        required: true,
    },

});

export default mongoose.model('MenuItem', menuItemSchema);

