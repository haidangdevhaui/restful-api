import mongoose, {Schema} from 'mongoose';

let mediaSchema = new mongoose.Schema({
    uid: Schema.Types.ObjectId, //user_id
    cid: String, //cloud_id
    aid: Schema.Types.ObjectId, //album_id
    src: String,
    type: String,
    created_at: {
        type: Date,
        default: Date.now()
    }
}, {
	collection: 'images'
});

export default mongoose.model('images', mediaSchema);