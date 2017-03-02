import mongoose, {Schema} from 'mongoose';

let requestSchema = new mongoose.Schema({
    _request: Schema.Types.ObjectId,
	_receive: Schema.Types.ObjectId,
	created_at: {
		type: Date,
		default: Date.now()
	}
}, {
	collection: 'requests'
});

export default mongoose.model('requests', requestSchema);