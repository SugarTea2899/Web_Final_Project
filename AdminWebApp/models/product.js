const mongoose = require('mongoose');

mongoose.connect(process.env.URI, { useUnifiedTopology: true, useNewUrlParser: true });

const productSchema = new mongoose.Schema({
    name: String,
    type: String,
    price: Number,
    image: String,
    brand: String,
    quantity: Number
}, { collection: 'products' });

module.exports = mongoose.model('product', productSchema);