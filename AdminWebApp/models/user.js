const mongoose = require('mongoose');

mongoose.connect(process.env.URI, { useUnifiedTopology: true, useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    fullName: String,
    username: String,
    email: String,
    password: String,
    isBanned: Boolean,
    role: String,
    phone: String,
    address: String,
    isActive: Boolean
}, { collection: 'users' });

userSchema.virtual('id').get(function (){
    return this._id;
})

module.exports = mongoose.model('user', userSchema);
