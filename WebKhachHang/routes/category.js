var express = require('express');
var router = express.Router();
const productController = require('../controller/ProductController');
const categoryController = require('../controller/CategoryController.js');


/* GET category page*/
router.get('/', async function(req, res, next) {
    categoryController.getListProducts(req, res, next);
});


router.get('/product',function(req, res, next){
    productController.getProductDetails(req, res, next);
});

module.exports = router;
