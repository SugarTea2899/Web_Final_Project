var express = require('express');
var router = express.Router();
const api = require('../api/api');


router.get('/list-product', function(req, res, next){
    api.getListProduct(req, res, next);
})

router.post('/update-cart', function(req, res, next){
    api.updateCart(req, res, next);
})

router.post('/checkout', function(req, res, next){
    api.checkOutBill(req, res, next);
})

router.post('/send-cmt', function(req, res, next){
    api.sendCmt(req, res, next);
})

router.get('/user-cart', function(req, res, next){
    api.getListCart(req, res, next);
})

router.get('/cmt-list', function(req, res, next){
    api.getListCmt(req, res, next);
})

router.get('/user-bill', function(req, res, next){
    api.getUserBill(req, res, next);
})
module.exports = router;
