var express = require('express');
var router = express.Router();
const product = require('../models/product');
const productController = require('../controller/ProductController');
const categoryController = require('../controller/CategoryController.js');


/* GET category page*/
router.get('/', async function(req, res, next) {
    categoryController.getListProducts(req, res, next);
});


product.find().then(function(docs) {
    docs.forEach(function(doc) {
        router.get('/' + doc._id, function(req, res, next) {
            productController.getProductDetails(req, res, doc);
        })
    })
})

module.exports = router;
