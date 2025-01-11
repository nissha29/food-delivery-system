import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    items: [
        {
            menuItem: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'MenuItem', 
                required: true 
            },
            quantity: { 
                type: Number, 
                required: true,
                default: 1,
            },
        },
    ],
    totalAmount: { 
        type: Number, 
        required: true 
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
}, {
    timestamps: true,
});

export default mongoose.model('Order', orderSchema);

