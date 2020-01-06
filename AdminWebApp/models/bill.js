const mongoose = require('mongoose');

mongoose.connect(process.env.URI, { useUnifiedTopology: true, useNewUrlParser: true });

const billSchema = new mongoose.Schema({

    fullname: String,
    phone: String,
    userId: String,
    email: String,
    address: String,
    note: String,
    createOn: Date,
    totalBill: Number

}, { collection: 'bill' });

module.exports = mongoose.model('bill', billSchema);
