import mongoose from 'mongoose';

let schema = new mongoose.Schema({
    categoryID: mongoose.Schema.Types.ObjectId,
    authorID: mongoose.Schema.Types.ObjectId,
    title: String,
    slug: String,
    image: String,
    content: String,
    public: {
        type: Boolean,
        default: true
    },
    view: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
}, {
	collection: 'posts'
});

export default mongoose.model('posts', schema);