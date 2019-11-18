const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://readonly:64Bal539UA7EyMDS@mydatabase-0veyu.gcp.mongodb.net/MyStore?retryWrites=true&w=majority",  {useUnifiedTopology: true ,useNewUrlParser: true });

const productSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: String,
  image: String,
  brand: String,
  no: String
}, {collection: 'products'});

module.exports = mongoose.model('product', productSchema);
