const mongoose = require('mongoose');

mongoose.connect(process.env.URI, { useUnifiedTopology: true, useNewUrlParser: true });

const productSchema = new mongoose.Schema({
    name: String,
    type: String,
    price: String,
    image: String,
    brand: String,
    no: String
}, { collection: 'products' });

module.exports = mongoose.model('product', productSchema);