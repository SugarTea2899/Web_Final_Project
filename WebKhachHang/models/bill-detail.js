const mongoose = require('mongoose');

mongoose.connect(process.env.URI, { useUnifiedTopology: true, useNewUrlParser: true });

const billDetailSchema = new mongoose.Schema({
    billId: String,
    productId: String,
    quantity: Number,
    totalPrice: Number
},{collection: 'bill-detail'});

module.exports = mongoose.model('bill-detail', billDetailSchema);