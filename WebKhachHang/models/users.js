const mongoose = require('mongoose');

mongoose.connect(process.env.URI, { useUnifiedTopology: true, useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    username: String,
    password: String,
    isActive: Boolean
}, { collection: 'users' });

userSchema.virtual('id').get(function (){
    return this._id;
})

module.exports = mongoose.model('user', userSchema);