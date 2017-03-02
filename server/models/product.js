import mongoose from 'mongoose';
import hash from 'password-hash';

let productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    active: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
}, {
	collection: 'products'
});

export default mongoose.model('products', productSchema);