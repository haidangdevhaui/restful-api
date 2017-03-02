import mongoose, {Schema} from 'mongoose';

let statusSchema = new mongoose.Schema({
    content: String,
    uid: Schema.Types.ObjectId,
    images: [Schema.Types.ObjectId],
    videos: [Schema.Types.ObjectId],
    likes: [Schema.Types.ObjectId],
    dislikes: [Schema.Types.ObjectId],
    shares: [Schema.Types.ObjectId],
    created_at: {
        type: Date,
        default: Date.now()
    }
}, {
	collection: 'statuses'
});

export default mongoose.model('statuses', statusSchema);