var express = require('express');
const UploadController = require('../controller/UploadController');
const ProductController = require('../controller/ProductController');
const Product = require('../models/product');
var router = express.Router();


router.get('/add', function(req, res, next) {
    ProductController.addNewProduct(req, res, next);
});

router.post('/add', UploadController.uploadImage(), async function(req, res, next) {
    ProductController.PostProductInfoToDatabase(req, res, next, UploadController.getId(), UploadController.getLink());
});

router.post('/edit-product', async function(req, res, next) {
    const product = req.body.myProduct;
    const id = req.body.myid;
    idModify = id;
    const image = req.body.myimage;
    const modify = JSON.parse(product);
    try {
        const item = await Product.findById(id);
        item.name = modify.name;
        item.type = modify.type;
        item.price = modify.price;
        item.brand = modify.brand;
        item.quantity = modify.quantity;
        await item.save();
        res.send().status(200);
    }
    catch (e) {
        console.log(e);
    }
});

router.get('/edit-product', async function(req, res, next) {
    const id = req.query.myid;
    const product = await Product.findOne({ _id: id });
    res.json(product);
})

module.exports = router;