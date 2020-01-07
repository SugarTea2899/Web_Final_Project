const mongoose = require('mongoose');

mongoose.connect(process.env.URI, { useUnifiedTopology: true, useNewUrlParser: true });

const cmtSchema = new mongoose.Schema({
    userId: String,
    fullname: String,
    productId: String,
    cmt: String,
    createOn: Date
},{collection: 'comment'});

module.exports = mongoose.model('comment', cmtSchema)