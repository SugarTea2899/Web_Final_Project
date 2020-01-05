var express = require('express');
const UploadController = require('../controller/UploadController');
const ProductController = require('../controller/ProductController');
var router = express.Router();

router.get('/add', function(req, res, next) {
    ProductController.addNewProduct(req, res, next);
});

router.post('/add', UploadController.uploadImage(), async function(req, res, next) {
    ProductController.PostProductInfoToDatabase(req, res, next, UploadController.getId(), UploadController.getLink());
});

module.exports = router;