import mongoose from 'mongoose';

let schema = new mongoose.Schema({
    name: String,
    slug: String,
    image: String,
    created_at: {
        type: Date,
        default: Date.now()
    }
}, {
	collection: 'categories'
});

export default mongoose.model('categories', schema);