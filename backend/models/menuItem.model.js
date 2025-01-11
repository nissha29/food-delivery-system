import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    availability: { 
        type: Boolean,
        default: true 
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^https?:\/\/(?:localhost|[\w-]+(?:\.[\w-]+)+)(?::\d+)?\/uploads\/images\/[\w-]+\.(?:jpg|jpeg|png)$/i.test(v);
            },
            message: 'Invalid image url'
        }
    },

});

export default mongoose.model('MenuItem', menuItemSchema);

