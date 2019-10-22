const mongoose = require('mongoose');
var Hash = require('password-hash');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: String,
    password: String,
    isAdmin: { type: Boolean, default: false },
    branchName: String
});

UserSchema.methods.verifyPassword = async (password) => {
    const user = await UserSchema.findOne({ password: Hash.generate(password) });
    if(!user){
        return false;
    }
    return true;
}


mongoose.model('users', UserSchema);