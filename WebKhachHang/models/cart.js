const mongoose = require('mongoose');

mongoose.connect(process.env.URI, { useUnifiedTopology: true, useNewUrlParser: true });

const cartSchema = new mongoose.Schema({
    userId: String,
    productId: String,
    quantity: Number,
    totalPrice: Number
},{collection: 'cart'});

module.exports = mongoose.model('cart', cartSchema);