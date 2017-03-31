import mongoose from 'mongoose';

let schema = new mongoose.Schema({
    fullname: String,
    username: String,
    password: String,
    description: String,
    job: String,
    avatar: String,
    created_at: {
        type: Date,
        default: Date.now()
    }
}, {
	collection: 'authors'
});

export default mongoose.model('authors', schema);