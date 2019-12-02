var express = require('express');
var router = express.Router();
const product = require('../models/product');
const productController = require('../controller/ProductController');

product.find().then(function(docs) {
    docs.forEach(function(doc) {
        router.get('/' + doc.no, function(req, res, next) {
            productController.getProductDetails(req, res, doc);
        })
    })
})
module.exports = router;