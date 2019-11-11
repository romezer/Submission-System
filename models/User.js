const mongoose = require('mongoose');
var Hash = require('password-hash');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: String,
    password: String,
    isAdmin: { type: Boolean, default: false },
    branchName: String
});

UserSchema.methods.verifyPassword =  function(password){
    const myModal = mongoose.model('users');
    const user =  myModal.findOne({ password: Hash.generate(password) });
    if(!user){
        return false;
    }
    return true;
}

UserSchema.statics.findByPassword = function(password, hashPass) {
  const res =   Hash.verify(password, hashPass)
    return res;
  };


mongoose.model('users', UserSchema);