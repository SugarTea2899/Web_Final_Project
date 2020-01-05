var express = require('express');
var router = express.Router();
const api = require('../api/api');


router.get('/list-product', function(req, res, next){
    api.getListProduct(req, res, next);
})

router.post('/update-cart', function(req, res, next){
    api.updateCart(req, res, next);
})

router.get('/user-cart', function(req, res, next){
    api.getListCart(req, res, next);
})
module.exports = router;
