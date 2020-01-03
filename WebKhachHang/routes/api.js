var express = require('express');
var router = express.Router();
const api = require('../api/api');


router.get('/list-product', function(req, res, next){
    api.getListProduct(req, res, next);
})

module.exports = router;
