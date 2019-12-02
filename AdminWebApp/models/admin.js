const mongoose = require('mongoose');

mongoose.connect(process.env.URI, { useUnifiedTopology: true, useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    fullName: String,
    username: String,
    email: String,
    password: String
}, { collection: 'admins' });

userSchema.virtual('id').get(function (){
    return this._id;
})

module.exports = mongoose.model('admin', userSchema);