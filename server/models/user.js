import mongoose from 'mongoose';
import hash from 'password-hash';

let userSchema = new mongoose.Schema({
    email: String,
	username: String,
    password: String,
    fullname: String,
    birthday: Date,
    age: {
        type: Number,
        default: 0
    },
    gender: {
        type: Number,
        default: 0 //0: male 1: famale
    },
    job: String,
    description: String,
    avatar: {
        type: String,
        default: 'public/user/avatar/default.png'
    },
    friends: [],
    created_at: {
        type: Date,
        default: Date.now()
    }
}, {
	collection: 'users'
});

userSchema.methods.hashPassword = function(pw){
    return hash.generate(pw);
}
userSchema.methods.authenticate = function (pw) {
	return hash.verify(pw, this.password);
};

export default mongoose.model('users', userSchema);